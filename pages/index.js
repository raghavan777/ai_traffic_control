import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [vehicleCount, setVehicleCount] = useState(50);
  const [weather, setWeather] = useState('clear');
  const [signalDuration, setSignalDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function predict() {
    setLoading(true);
    setError(null);
    setSignalDuration(null);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle_count: Number(vehicleCount),
          time_of_day: new Date().getHours(),
          weather
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setSignalDuration(data.signal_duration);
    } catch (e) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <h1>AI Traffic Control</h1>
      <div className={styles.card}>
        <div className={styles.row}>
          <label>Vehicles:</label>
          <input
            type="number"
            min={0}
            value={vehicleCount}
            onChange={(e) => setVehicleCount(e.target.value)}
          />
          <label>Weather:</label>
          <select value={weather} onChange={(e) => setWeather(e.target.value)}>
            <option value="clear">Clear</option>
            <option value="rainy">Rainy</option>
            <option value="cloudy">Cloudy</option>
          </select>
          <button onClick={predict} disabled={loading}>
            {loading ? 'Predicting…' : 'Predict Signal'}
          </button>
        </div>

        <p className={styles.hint}>
          Uses a simple mock model (vehicles × factors) to estimate a suggested signal duration.
        </p>

        {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
        {signalDuration !== null && (
          <p>
            Suggested green light: <strong>{signalDuration} seconds</strong>
          </p>
        )}
      </div>
    </main>
  );
}
