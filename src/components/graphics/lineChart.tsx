import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, LineChart } from 'recharts';



interface lineChartType {
    data: unknown[];
    datakey?: string;
    datekey?: string;
}

const lineChar: React.FC<lineChartType> = ({ data, datakey, datekey }) => {
    return (
        <LineChart
            width={505}
            height={350}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 1" />
            <XAxis dataKey={datekey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={datakey} stroke="#8884d8" />
        </LineChart>
    )
}

export default lineChar