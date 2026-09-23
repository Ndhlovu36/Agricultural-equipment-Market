export default async function handler(req,res){
 const {paymentId}=req.body;
 await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{
  method:"POST", headers:{"Authorization":`Key ${process.env.PI_API_KEY}`}
 });
 res.json({ok:true});
}
