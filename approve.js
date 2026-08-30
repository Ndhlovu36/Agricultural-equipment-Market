export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  try {
    // Vercel sometimes needs manual parse
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    
    const paymentId = body?.paymentId;
    console.log("Approving paymentId:", paymentId);
    
    if (!paymentId) {
      return res.status(400).json({ error: "No paymentId" });
    }
    
    if (!process.env.PI_API_KEY) {
      return res.status(500).json({ error: "PI_API_KEY not set in Vercel" });
    }

    const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const piData = await piResponse.json();
    console.log("Pi response:", piData);
    
    return res.status(200).json(piData);
    
  } catch (e) {
    console.error("APPROVE ERROR:", e);
    return res.status(500).json({ error: e.message });
  }
}
