const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
	bookId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book",
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
	},
	comment: String,
})

reviewSchema.index({ bookId: 1, userId: 1 }, { unique: true })

module.exports = mongoose.model("Review", reviewSchema)
