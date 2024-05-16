import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface barChartType {
    data: unknown[];
    datakey: string;
    datekey: string;
}


const barChart: React.FC<barChartType> = ({ data, datakey, datekey }) => {
    return (
        <BarChart width={480} height={300} data={data}>
            <Legend />
            <XAxis dataKey={datekey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar type="monotone" dataKey={datakey} stroke="#8884d8" fill="#8884d8" />
        </BarChart>
    )
}

export default barChart