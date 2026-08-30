export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);
    const { paymentId, txid } = body;
    const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    });
    const piData = await piResponse.json();
    return res.status(200).json(piData);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
