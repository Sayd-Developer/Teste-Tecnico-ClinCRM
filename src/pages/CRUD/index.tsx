import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { Button } from "../../components/ui/button";

const schemaForm = z.object({
    nome: z.string().min(3, 'Por favor, informe um nome válido'),
    operacao: z.string().min(3, 'Por favor, informe uma operação válida'),
    valor: z.string().min(1, 'Por favor, informe um valor válido'),
    pagamento: z.string().min(3, 'Por favor, informe um tipo de pagamento válido'),
    data: z.string().min(10, 'Por favor, informe uma data válida'),
});

type FormProps = z.infer<typeof schemaForm>;

export default function NewForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({
        resolver: zodResolver(schemaForm)
    });

    const onSubmit = (data: FormProps) => {
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="nome" className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
                    <input {...register('nome')} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
                    {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="operacao" className="block text-gray-700 text-sm font-bold mb-2">Operação:</label>
                    <input {...register('operacao')} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
                    {errors.operacao && <span className="text-red-500 text-sm">{errors.operacao.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="valor" className="block text-gray-700 text-sm font-bold mb-2">Valor:</label>
                    <input type="text" {...register('valor')} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
                    {errors.valor && <span className="text-red-500 text-sm">{errors.valor.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="pagamento" className="block text-gray-700 text-sm font-bold mb-2">Pagamento:</label>
                    <input {...register('pagamento')} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
                    {errors.pagamento && <span className="text-red-500 text-sm">{errors.pagamento.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="data" className="block text-gray-700 text-sm font-bold mb-2">Data:</label>
                    <input type="date" {...register('data')} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
                    {errors.data && <span className="text-red-500 text-sm">{errors.data.message}</span>}
                </div>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Criar</Button>
            </form>
        </div>
    );
}
