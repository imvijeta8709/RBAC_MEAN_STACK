const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(402).json({message:"Token Misiing"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_TOKEN)
        req.user=decoded;
        next();
    }catch(e){
        return res.status(401).json({ message: "Invalid token" });
    }

}