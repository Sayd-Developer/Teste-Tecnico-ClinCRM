import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface areaChartType {
    data: any[];
    datakey?: string;
    datekey?: string;
}


const areaChar: React.FC<areaChartType> = ({ data, datakey, datekey }) => {
    return (
        <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={datekey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey={datakey} stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    )
}

export default areaChar