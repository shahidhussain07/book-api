const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ message: "Authorization header missing or malformed" })
	}

	const token = authHeader.split(" ")[1]

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decoded // example: { id, username, etc. }
		next()
	} catch (err) {
		console.error("JWT error:", err)
		res.status(403).json({ message: "Invalid or expired token" })
	}
}
