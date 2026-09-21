export default async function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');
 if(req.method==='GET') return res.status(200).json({status:'complete alive'});
 try{
  const {paymentId, txid} = req.body || {};
  if(!process.env.PI_API_KEY) return res.status(200).json({ok:true});
  const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`,{
   method:'POST',
   headers:{'Authorization':`Key ${process.env.PI_API_KEY}`,'Content-Type':'application/json'},
   body:JSON.stringify({txid})
  });
  const data = await r.json();
  return res.status(200).json(data);
 }catch(e){ return res.status(200).json({ok:true}); }
}
