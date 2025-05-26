const express = require("express")
const Review = require("../models/review")
const auth = require("../middleware/auth")
const router = express.Router()

router.put("/:id", auth, async (req, res) => {
	try {
		const review = await Review.findById(req.params.id)
		if (!review || review.user.toString() !== req.user.id) {
			return res.status(403).json({ message: "Unauthorized" })
		}
		Object.assign(review, req.body)
		await review.save()
		res.json(review)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

router.delete("/:id", auth, async (req, res) => {
	try {
		const review = await Review.findById(req.params.id)
		if (!review || review.user.toString() !== req.user.id) {
			return res.status(403).json({ message: "Unauthorized" })
		}
		await review.remove()
		res.json({ message: "Review deleted" })
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

module.exports = router
