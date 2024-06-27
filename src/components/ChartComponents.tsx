import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./index.css"

const ChartComponent: React.FC = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('daily');

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleClick = (data: any, index: number | null) => {
    if (data && data.payload) {
      alert(`Timestamp: ${data.payload.timestamp}, Value: ${data.payload.value}`);
    } else {
      console.warn('Data or payload is undefined:', data);
    }
  };

  const filteredData = data.filter((_, index) => {
    if (timeframe === 'daily') return true;
    if (timeframe === 'weekly') return index % 7 === 0;
    if (timeframe === 'monthly') return index % 30 === 0;
  });

  return (
    <div>
      <div>
        <button className="button button1" onClick={() => setTimeframe('daily')}>Daily</button>
        <button  className="button button1" onClick={() => setTimeframe('weekly')}>Weekly</button>
        <button className="button button1"  onClick={() => setTimeframe('monthly')}>Monthly</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart 
          data={filteredData} 
          onClick={(e) => {
            if (e && e.activeTooltipIndex !== undefined) {
              handleClick(e, e.activeTooltipIndex);
            } else {
              handleClick(e, null);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
