export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const {paymentId}=req.body;
    const key=process.env.PI_API_KEY;
    if(!key) return res.status(500).json({ok:false,error:'PI_API_KEY missing'});
    const r=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{
      method:'POST', headers:{'Authorization':`Key ${key}`}
    });
    const t=await r.text();
    console.log('APPROVE',paymentId,r.status,t);
    return res.status(200).json({ok:r.ok, pi_status:r.status});
  }catch(e){ return res.status(200).json({ok:false,error:e.message}); }
}
