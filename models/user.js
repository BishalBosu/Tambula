const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	ticketsCount:{
		type: Number,
		required: true,
	},
	
	tickets: {
        type: Object,
        default: {},
    }



})
userSchema.methods.addTicket = function (ticketArray) {	
	this.ticketsCount += 1;
	this.tickets[`ticket${this.ticketsCount}`] = ticketArray;
	
	this.markModified("tickets"); // Mark the "tickets" field as modified

	this.save()
	
}

module.exports = mongoose.model("User", userSchema)