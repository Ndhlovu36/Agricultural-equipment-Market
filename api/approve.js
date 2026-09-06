export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error: 'Use POST'});
  
  const { paymentId } = req.body;
  if (!paymentId) return res.status(400).json({error: 'Missing paymentId'});

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log('Approved:', paymentId, data);
    return res.status(200).json(data);
    
  } catch (e) {
    console.error('Approve error:', e);
    return res.status(500).json({error: e.message});
  }
}
