export default async function handler(req, res) {
  const { paymentId, txid } = req.body;
  const PI_API_KEY = process.env.PI_API_KEY;
  const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
    method: 'POST',
    headers: { 'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ txid })
  });
  const data = await response.json();
  res.status(200).json(data);
}
