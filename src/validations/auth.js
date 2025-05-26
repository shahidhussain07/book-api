const { z } = require("zod")

exports.signupSchema = z.object({
	username: z.string().min(3),
	password: z.string().min(6),
})

exports.loginSchema = z.object({
	username: z.string(),
	password: z.string(),
})
