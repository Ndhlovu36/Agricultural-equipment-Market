export default async function handler(req, res) {
  const { paymentId, txid } = req.body;
  const key = process.env.PI_API_KEY;
  const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
    method: 'POST',
    headers: { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ txid })
  });
  const data = await r.json();
  res.status(200).json(data);
}
