//configuring enviroment variables from .env file
require("dotenv").config()

//importing packages
const express = require("express");
const path = require("path");
const fs = require("fs")

const mongoose = require("mongoose");
const bodyParser = require("body-parser")

//for optimization
const compression = require("compression")
const morgan = require("morgan")

const cors = require("cors")


//importing routes
const registerRoutes = require('./routes/register')
const ticketRoutes = require('./routes/ticket')


const app = express();



//to make the public folder available to clients
app.use(express.static(path.join(__dirname, "public")));
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, "access.log"),
	{ flags: "a" }
)


app.use(compression())
app.use(morgan("combined", { stream: accessLogStream }))


// app.use(cors({
//   "origin": "*",
//   "methods": "GET,POST,DELETE",
// }))

app.use(bodyParser.json({ extended: false }))

//making routes active
app.use("/user", registerRoutes);
app.use("/ticket", ticketRoutes);



app.use((req, res, next) => {
	res.redirect("/views/html/login.html")
})



mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.bcjhxwl.mongodb.net/tambula?retryWrites=true&w=majority`
	)
	.then((result) => {
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	})
