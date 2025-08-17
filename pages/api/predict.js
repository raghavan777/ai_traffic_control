export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { vehicle_count, time_of_day, weather } = req.body || {};

  // Input validation
  const vehicles = Number.isFinite(vehicle_count) ? vehicle_count : Number(vehicle_count);
  if (!Number.isFinite(vehicles) || vehicles < 0) {
    return res.status(400).json({ error: 'vehicle_count must be a non-negative number' });
  }
  const hour = Number(time_of_day);
  const validHour = Number.isFinite(hour) && hour >= 0 && hour <= 23 ? hour : new Date().getHours();
  const w = (weather || 'clear').toLowerCase();

  // Simple mock model logic
  const base = vehicles * 0.5;
  const isPeak = (validHour >= 7 && validHour <= 9) || (validHour >= 17 && validHour <= 20);
  const timeFactor = isPeak ? 1.5 : 1.0;
  const weatherFactor = w === 'rainy' ? 1.2 : w === 'cloudy' ? 1.05 : 1.0;

  const signal_duration = Math.round(base * timeFactor * weatherFactor);
  res.status(200).json({ signal_duration });
}
