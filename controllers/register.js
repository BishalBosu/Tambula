const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.postRegUsers = async (req, res, next) => {
	const email = req.body.email
	const name = req.body.name
	const password = req.body.password

	try {
		//checking if the email already registered.
		const user = await User.findOne({ email: email })

		if (user !== null) {
			return res.status(409).json({ message: "email already registered!" })
		} else {
			bcrypt.hash(password, 10, async (err, hash) => {
				if (err) console.log(err)
				const user = new User({
					email: email,
					name: name,
					password: hash,
                    ticketsCount: 0
					
				})
				const result = await user.save()
				console.log(result);
				res.json(result.name)
			})
		}
	} catch (err) {
		//indicating internal error
		res.status(500).json(err)
	}
}

exports.postLogIn = async (req, res, next) => {
	let email = req.body.email
	const password = req.body.password

	try {
		const user = await User.findOne({ email: email })

		//console.log(user.password);
		const hashed_password = user.password
		const name = user.name
		const _id = user._id

		bcrypt.compare(password, hashed_password, async (err, result) => {
			if (err) {
				return res.status(500).json({ message: "Something went wrong" })
			}

			if (result) {
				const token = generateAcessToken(_id, email, name)
				obj = {
					email,
					token,
				}
				return res.json(obj)
			} else {
				return res.status(401).json({ message: "password not matched" })
			}
		})
	} catch (err) {
		return res.status(404).json({ message: "not found" })
	}
}

function generateAcessToken(_id, email, name, is_premium) {
	return jwt.sign(
		{ _id: _id, userEmail: email, name: name, is_premium: is_premium },
		process.env.TOKEN_PRIVATE_KEY
	)
}
