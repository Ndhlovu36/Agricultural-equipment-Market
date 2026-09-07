export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const {paymentId,txid}=req.body;
    const key=process.env.PI_API_KEY;
    if(!key) return res.status(500).json({ok:false,error:'PI_API_KEY missing'});
    const r=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`,{
      method:'POST',
      headers:{'Authorization':`Key ${key}`,'Content-Type':'application/json'},
      body:JSON.stringify({txid})
    });
    const t=await r.text();
    console.log('COMPLETE',paymentId,txid,r.status,t);
    return res.status(200).json({ok:r.ok});
  }catch(e){ return res.status(200).json({ok:false,error:e.message}); }
}
