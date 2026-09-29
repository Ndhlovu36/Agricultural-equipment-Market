export default async function handler(req,res){
  const PI_KEY = process.env.PI_API_KEY;
  const r = await fetch(`https://api.minepi.com/v2/payments?limit=100`,{
    headers: { 'Authorization': `Key ${PI_KEY}` }
  });
  const data = await r.json();
  return res.json(data);
}