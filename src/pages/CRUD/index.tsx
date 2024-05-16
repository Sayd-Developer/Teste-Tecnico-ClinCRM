import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { Button } from "../../components/ui/button";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, deleteDoc, getDocs, updateDoc } from "firebase/firestore";

const schemaForm = z.object({
    nome: z.string().min(3, 'informe um nome válido'),
    operacao: z.string().min(3, 'informe uma operação válida'),
    valor: z.number().min(1, 'informe um valor válido'),
    pagamento: z.string().min(3, 'informe um tipo de pagamento válido'),
    data: z.string().min(1, 'informe uma data válida'),
});

type FormProps = z.infer<typeof schemaForm>;

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAoUkHfSEyEuJYiJKplQT48rtionfWsdnM",
    authDomain: "project-clincrm.firebaseapp.com",
    projectId: "project-clincrm",
})

const db = getFirestore(firebaseApp)
const countCollectionRef = collection(db, "contas");

interface CountItemProps {
    id: string;
    nome: string;
    operacao: string;
    valor: number;
    pagamento: string;
    data: string;
}

export default function Crud() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormProps>({
        resolver: zodResolver(schemaForm)
    });

    const [count, setCount] = useState<CountItemProps[]>([]);

    const [editId, setEditId] = useState<string | null>(null);


    useEffect(() => {
        const getCount = async () => {
            const data = await getDocs(countCollectionRef);
            const countData = data.docs.map(doc => ({ id: doc.id, ...doc.data() } as CountItemProps)); // Certifique-se de tipar os dados como CountItemProps
            setCount(countData);
        };
        getCount();
    }, []);

    const onSubmit = async (data: FormProps) => {
        try {
            if (editId) {
                await updateDoc(doc(db, "contas", editId), data);
                setEditId(null);
            } else {
                await addDoc(collection(db, "contas"), data);
            }
            reset();
        } catch (error) {
            console.error("Erro ao adicionar documento: ", error);
        }
    };

    const deleteCount = async (id: number | string) => {
        try {
            const docId = id.toString();
            await deleteDoc(doc(db, "contas", docId));
            setCount(count.filter(item => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar documento: ", error);
        }
    };

    const editCount = (id: number | string) => {
        const countToEdit = count.find(item => item.id === id);
        if (countToEdit) {
            reset(countToEdit);
            setEditId(id.toString());
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 shadow-md rounded-md p-8 mt-4 mb-4 max-w-lg">
                <div className="flex flex-col mb-4">
                    <label htmlFor="nome" className="block text-sm font-bold mb-2">Nome:</label>
                    <input {...register('nome')} className="input text-black focus:outline-none rounded-md p-1" />
                    {errors.nome && <span className="text-red-500 text-xs self-start mb-2">{errors.nome.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="operacao" className="block text-sm font-bold mb-2">Operação:</label>
                    <input {...register('operacao')} className="input text-black focus:outline-none rounded-md p-1" />
                    {errors.operacao && <span className="text-red-500 text-xs self-start mb-2">{errors.operacao.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="valor" className="block text-sm font-bold mb-2">Valor:</label>
                    <input type="number" {...register('valor')} className="input text-black focus:outline-none rounded-md p-1" />
                    {errors.valor && <span className="text-red-500 text-xs self-start mb-2">{errors.valor.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="pagamento" className="block text-sm font-bold mb-2">Pagamento:</label>
                    <input {...register('pagamento')} className="input text-black focus:outline-none rounded-md p-1" />
                    {errors.pagamento && <span className="text-red-500 text-xs self-start mb-2">{errors.pagamento.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="data" className="block text-sm font-bold mb-2">Data:</label>
                    <input type="date" {...register('data')} className="input text-black focus:outline-none rounded-md p-1" />
                    {errors.data && <span className="text-red-500 text-xs self-start mb-2">{errors.data.message}</span>}
                </div>
                <Button type="submit" className="btn">{editId ? 'Editar' : 'Criar'}</Button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4x2 ">
                {count.map(count => (
                    <div key={count.id} className="bg-gray-800 p-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">{count.nome}</h3>
                        <p>Operação: {count.operacao}</p>
                        <p>Valor: {count.valor}</p>
                        <p>Pagamento: {count.pagamento}</p>
                        <p>Data: {count.data}</p>
                        <div className="flex justify-between mt-4">
                            <button onClick={() => deleteCount(count.id)} className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out">Deletar</button>
                            <button onClick={() => editCount(count.id)} className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">Editar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}




