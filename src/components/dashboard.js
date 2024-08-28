import React, { useEffect, useState } from 'react';
import './dashboard.css'; // Optional: For styling
import temperature from '../assets/hot.png';
import humidityLogo from '../assets/humidity.png'
import air from '../assets/air.png'
import tvoc from '../assets/molecular.png'
import aqi from '../assets/aqi.png'
import c02 from '../assets/c02.png'
import battery from '../assets/power.png'


function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('your api here ')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((text) => {
        const parsedData = parseTextResponse(text);
        setData(parsedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <div className="dashboard">
      <Card title="Temperature" value={data.Temperature} unit="°C" logo={temperature} />
      <Card title="Humidity" value={data.Humidity} unit="%" logo={humidityLogo}/>
      <Card title="Pressure" value={data.Pressure} unit="hPa" logo={air} />
      <Card title="TVOC" value={data.TVOC} unit="ppb" logo={tvoc} />
      <Card title="eCO2" value={data.eCO2} unit="ppm" logo={c02} />
      <Card title="AQI" value={data.AQI} unit="" logo={aqi} />
      <Card title="Battery" value={data.Battery} unit="%" logo={battery} />
      
        
      
    </div>
    <footer>
     Last refreshed {data['Received DateTime']}
    </footer>
    </>
  );
}

function parseTextResponse(text) {
  const data = {};
  const lines = text.split('\n');

  lines.forEach((line) => {
    const [key, value] = line.split(':').map((item) => item.trim());
    if (key && value !== undefined) {
      data[key] = value;
    }
  });

  return data;
}

function Card({ title, value, unit, logo }) {
  return (
    <div className="card">
      <img src={logo} alt={`${title} logo`} className="card-logo" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>
          {value} {unit}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
