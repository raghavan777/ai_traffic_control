import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [signalDuration, setSignalDuration] = useState(null);
  const [vehicleCount, setVehicleCount] = useState(50);

  const predictSignal = async () => {
    const res = await axios.post('/api/predict', {
      vehicle_count: vehicleCount,
      time_of_day: new Date().getHours(),
      weather: 'clear'
    });
    setSignalDuration(res.data.signal_duration);
  };

  useEffect(() => {
    predictSignal();
    const interval = setInterval(predictSignal, 5000);
    return () => clearInterval(interval);
  }, [vehicleCount]);

  return (
    <div className={styles.container}>
      <h1>🚦 AI Traffic Signal Control</h1>
      <p>Vehicle Count: <input type="number" value={vehicleCount} onChange={e => setVehicleCount(e.target.value)} /></p>
      <p>Predicted Signal Duration: <strong>{signalDuration} seconds</strong></p>
    </div>
  );
}