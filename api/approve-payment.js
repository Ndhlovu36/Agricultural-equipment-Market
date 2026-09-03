export default async function handler(req, res) {
  const { paymentId } = req.body;
  const PI_API_KEY = process.env.PI_API_KEY;
  const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
    method: 'POST',
    headers: { 'Authorization': `Key ${PI_API_KEY}` }
  });
  const data = await response.json();
  res.status(200).json(data);
}
