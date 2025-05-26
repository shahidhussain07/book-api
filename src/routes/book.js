const express = require("express")
const router = express.Router()
const Book = require("../models/book")
const Review = require("../models/review")
const auth = require("../middleware/auth")

router.post("/", auth, async (req, res) => {
	try {
		const book = new Book({ ...req.body, createdBy: req.user.id })
		await book.save()
		res.status(201).json(book)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

router.get("/", async (req, res) => {
	try {
		const { author, genre, page = 1, limit = 10 } = req.query
		const filter = {}

		if (author) filter.author = new RegExp(author, "i")
		if (genre) filter.genre = new RegExp(genre, "i")

		const pageNum = parseInt(page)
		const limitNum = Math.min(parseInt(limit), 50) || 10

		const books = await Book.find(filter)
			.skip((pageNum - 1) * limitNum)
			.limit(limitNum)

		res.json(books)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

router.get("/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id)
		const reviews = await Review.find({ book: book._id })
		const avgRating =
			reviews.reduce((a, r) => a + r.rating, 0) / (reviews.length || 1)

		if (!book) return res.status(404).json({ message: "Book not found" })

		res.json({ book, avgRating, reviews })
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

router.post("/:id/reviews", auth, async (req, res) => {
	try {
		const exists = await Review.findOne({
			user: req.user.id,
			book: req.params.id,
		})
		if (exists) return res.status(400).json({ message: "Already reviewed" })
		const review = new Review({
			...req.body,
			user: req.user.id,
			book: req.params.id,
		})
		await review.save()
		res.status(201).json(review)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

module.exports = router
