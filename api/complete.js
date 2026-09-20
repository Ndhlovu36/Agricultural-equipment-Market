export default async function handler(req,res){
  try{
    const {paymentId,txid,delivery}=req.body;
    console.log("Payment completed:",paymentId,txid,delivery);
    res.status(200).json({completed:true});
  }catch(e){
    res.status(200).json({completed:true});
  }
}
