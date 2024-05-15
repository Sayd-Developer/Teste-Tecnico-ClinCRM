import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Página inicial da aplicação</h1>
                <p className="text-lg mb-8">Escolha o local que você quer ir 👍</p>
                <div className="flex justify-center">
                    <Link to="/crud" className="mr-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out">CRUD</Link>
                    <Link to="/graficos" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out">Gráficos</Link>
                </div>
            </div>
        </div>
    );
}
