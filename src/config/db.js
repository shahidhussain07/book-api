const mongoose = require("mongoose")

const connectDB = async MONGO_URL => {
	try {
		// Attempt to connect to MongoDB
		await mongoose.connect(MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		console.log("Connected to MongoDB Server")
	} catch (error) {
		console.error("Connection Error:", error)
		process.exit(1)
	}
}

module.exports = connectDB
