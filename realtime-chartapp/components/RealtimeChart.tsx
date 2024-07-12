'use client';
import { useState, useEffect, useRef } from 'react';
import { LineChart,Line,ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

interface ChartDataPoint {
    time: string;
    count: number;
}

const RealtimeChart = () => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    const base_url = "ws://localhost:8001/";
    const ws = new WebSocket(base_url + "dashboard-chart");

    ws.onopen = () => {
        console.log('WebSocket connected');
        ws.send('connect');
    };


    ws.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        setChartData(prevData => {
            const updatedData = [...prevData, newData];
            return updatedData.length > 30 ? updatedData.slice(-30) : updatedData;
        });
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
  
    ws.onclose = () => {
        console.log('WebSocket disconnected');
    };

    return () => {
        ws.close();
    };
  }, [])

  return (
    <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={400} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis dataKey="count" label={{ value: 'Number of library users', angle: -90, position: 'center', fontSize: 12, fill:'#ffffff' }} tick={{ fontSize: 12, fill:'#ffffff' }} />
                <XAxis dataKey="count" tick={{ fontSize: 12, fill:'#ffffff' }} />
                <Line type="monotone" dataKey="count" stroke="#FACC15" activeDot={{ r: 10 }}></Line>
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}




export default RealtimeChart