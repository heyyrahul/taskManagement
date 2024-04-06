const jwt = require("jsonwebtoken")

const {UserModel} = require("../model/user.model")

const auth = async(req,res,next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (token) {
		jwt.verify(token,process.env.secretKey, async(err,decoded) => {
				try{
					if (decoded) {
						const{userId} = decoded;
						const user = await UserModel.findOne({_id:userId});
						 req.id = user._id;
						next();
					}
					else{
						res.status(400).json({msg:err,token})
					}
				}
				catch(e){
					res.status(400).json({msg:e})
				}
			
			})
		
	} else {
		res.json({msg:"You are not Authorised"})
	}
}

module.exports = {
	auth
}