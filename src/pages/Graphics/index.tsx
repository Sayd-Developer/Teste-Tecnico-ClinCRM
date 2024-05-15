import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import BarChart from '@/components/graphics/barChar';
import AreaChart from '@/components/graphics/areaChart';
import LineChart from '@/components/graphics/lineChart';

const firebaseConfig = {
    apiKey: "AIzaSyAoUkHfSEyEuJYiJKplQT48rtionfWsdnM",
    authDomain: "project-clincrm.firebaseapp.com",
    projectId: "project-clincrm",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default function graphics() {
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'contas'));
                const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setData(data);
            } catch (error) {
                console.error('Erro ao buscar: ', error);
            }
        };

        fetchData();
    }, []);

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-7 text-center text-white ">Gráficos dos Valores</h1>
            <div className='mb-9'>
                <AreaChart data={data} datakey='valor' datekey='data' />
            </div>
            <div className='mb-9'>
                <LineChart data={data} datakey='valor' datekey='data' />
            </div>
            <div>
                <BarChart data={data} datakey='valor' datekey='data' />
            </div>
        </div>
    );
}
