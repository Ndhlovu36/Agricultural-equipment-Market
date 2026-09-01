export default async function handler(req,res){
 const {paymentId, txid} = req.body;
 const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`,{
  method:'POST',
  headers:{'Authorization':`Key ${process.env.PI_API_KEY}`, 'Content-Type':'application/json'},
  body: JSON.stringify({txid})
 });
 const d = await r.json();
 res.status(200).json(d);
}
