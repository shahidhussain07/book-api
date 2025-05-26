const express = require("express")
const app = express()

const authRoutes = require("./routes/auth")
const bookRoutes = require("./routes/book")
const reviewRoutes = require("./routes/review")
const searchRoutes = require("./routes/search")
const connectDB = require("./config/db")

require("dotenv").config()

app.use(express.json())

app.use("/api", authRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/search", searchRoutes)

const startServer = async () => {
	try {
		await connectDB(process.env.MONGODB_URI)
		app.listen(3000, () => {
			console.log(`Server running on port 3000`)
		})
	} catch (error) {
		console.error("Failed to start the server:", error)
	}
}

startServer()
