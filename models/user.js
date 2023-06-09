const mongoose = require("mongoose")

const Schema = mongoose.Schema

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
	ticketsCount: {
		type: Number,
		required: true,
	},

	tickets: [
		{
			_id: { 
				type: Schema.Types.ObjectId, 
				default: () => new mongoose.Types.ObjectId() 
			},
			ticket: { 
				type: Object, 
				default: []
			},
		},
	],
})
userSchema.methods.addTicket = async function (ticketArray) {
	const newTicket = {
        ticket: ticketArray,
    };

    this.tickets.push(newTicket);
    this.ticketsCount += 1;

    await this.save();
	return this.tickets[this.tickets.length - 1]._id;


}

//to find any ticket by its _id
//can be used
userSchema.methods.findTicketById = function (ticketId) {
    return this.tickets.find((ticket) => ticket._id.toString() === ticketId.toString());
};

module.exports = mongoose.model("User", userSchema)
