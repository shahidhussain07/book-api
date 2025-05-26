const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const { signupSchema, loginSchema } = require("../validations/auth")

router.post("/signup", async (req, res) => {
	try {
		const { username, password } = signupSchema.parse(req.body)
		const hashed = await bcrypt.hash(password, 10)

		await User.create({
			username,
			password: hashed,
		})
		res.status(201).json({ message: "User created" })
	} catch (err) {
		if (err.errors) {
			// Zod validation error
			return res
				.status(400)
				.json({ error: err.errors.map(e => e.message) })
		}
		console.error(err)
		res.status(500).json({ error: "Internal server error" })
	}
})

router.post("/login", async (req, res) => {
	try {
		const { username, password } = loginSchema.parse(req.body)
		const user = await User.findOne({ username })
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid credentials" })
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
		res.json({ token })
	} catch (err) {
		if (err.errors) {
			// Zod validation error
			return res
				.status(400)
				.json({ error: err.errors.map(e => e.message) })
		}
		console.error(err)
		res.status(500).json({ error: "Internal server error" })
	}
})

module.exports = router
