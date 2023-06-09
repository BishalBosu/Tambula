const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.authenticate = async(req, res, next) => {
    try {
		const token = req.header("Authorization")
		//console.log("token: ",token);
		const user = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
		const userInstance = await User.findById(user._id);

		req.user = userInstance;
		//console.log(userInstance)
		next();
	} catch (err) {
		console.log(err)
		return res.status(401).json({ succ: false })
	}

}