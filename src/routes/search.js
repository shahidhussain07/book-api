const express = require("express")
const Book = require("../models/book")
const router = express.Router()

router.get("/", async (req, res) => {
	try {
		const { q } = req.query
		const books = await Book.find({
			$or: [
				{ title: new RegExp(q, "i") },
				{ author: new RegExp(q, "i") },
			],
		})
		res.json(books)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

module.exports = router
