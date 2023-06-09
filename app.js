//configuring enviroment variables from .env file
require("dotenv").config()

//importing packages
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");



//importing routes

const app = express();



//to make the public folder available to clients
app.use(express.static(path.join(__dirname, "public")));

//activating the routes




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
