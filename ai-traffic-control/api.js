export default function handler(req, res) {
  const { vehicle_count, time_of_day, weather } = req.body;

  // Simple mock model logic
  const base = parseInt(vehicle_count) * 0.5;
  const timeFactor = time_of_day >= 7 && time_of_day <= 9 ? 1.5 : 1;
  const weatherFactor = weather === 'rainy' ? 1.2 : 1;

  const signal_duration = Math.round(base * timeFactor * weatherFactor);
  res.status(200).json({ signal_duration });
}