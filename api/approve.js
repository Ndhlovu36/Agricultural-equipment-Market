export default async function handler(req, res){
  const { paymentId } = req.body;
  const PI_API_KEY = process.env.PI_API_KEY;
  try{
    const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{
      method:'POST',
      headers:{'Authorization':`Key ${PI_API_KEY}`}
    });
    const data = await r.json();
    return res.status(200).json(data);
  }catch(e){ return res.status(500).json({error:e.message}); }
}
