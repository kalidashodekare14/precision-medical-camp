import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const Analytics = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    

    const { data: chartData = [] } = useQuery({
        queryKey: ["analyticsInfo", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/analytics/${user?.email}`)
            return res.data
        }
    })

    console.log(chartData)


    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <div>
                <h1 className='text-4xl my-10'>Analytics</h1>
            </div>
            <BarChart
                width={800}
                height={400}
                data={chartData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="camp_name" />
                <YAxis />
                <Bar dataKey="camp_fees" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    );
};

export default Analytics;