export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});
  try {
    const { paymentId } = req.body;
    const PiApiKey = process.env.PI_API_KEY;
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: { 'Authorization': `Key ${PiApiKey}` }
    });
    if (!response.ok) {
      const err = await response.text();
      return res.status(400).json({error: err});
    }
    res.status(200).json({approved: true});
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}
