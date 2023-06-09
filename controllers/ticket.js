// Helper function for generating random indexes
function generateRandomIndexes(rangeStart, rangeEnd) {
	var numbers = []

	while (numbers.length < 5) {
		var randomNumber = Math.floor(Math.random() * 9)

		if (!numbers.includes(randomNumber)) {
			numbers.push(randomNumber)
		}
	}

	return numbers
}

// Returns a 2D array (a tambula ticket array)
function generate_random_tambula_ticket() {
	return new Promise((resolve) => {
		let tambula_ticket_array = []

		for (let j = 0; j < 3; j++) {
			let row = [0, 0, 0, 0, 0, 0, 0, 0, 0]

			let randomIndexes = generateRandomIndexes()

			for (let i = 0; i < 5; i++) {
				let index = randomIndexes[i]
				let randomNumber

				if (index == 0) {
					randomNumber = Math.floor(Math.random() * 9) + 1
				} else if (index == 9) {
					randomNumber = Math.floor(Math.random() * 11) + 80
				} else {
					randomNumber = Math.floor(Math.random() * 10) + index * 10
				}

				row[index] = randomNumber
			}

			tambula_ticket_array.push(row)
		}

		resolve(tambula_ticket_array)
	})
}

exports.postAddTicket = async (req, res, next) => {
	try {
		let newTicket = await generate_random_tambula_ticket()

		let generatedTicket = await req.user.addTicket(newTicket)
		res.json({ticketID: generatedTicket, message: "ticket added successfully" })
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: "internal error" })
	}
}

//get method to give a page
exports.getTicketPage = (req, res, next) => {
	const pageno = req.query.pageno;
	const pagelen = req.query.pagelen;

	try {
		const tickets = req.user.tickets
		const start_index = (pageno - 1) * pagelen

		let selectedTickets = tickets.slice(start_index, start_index + +pagelen);
		
		res.json(selectedTickets)
	} catch (err) {
		console.log(err)
	}
}

//to get total number of tickets:
exports.getTicketsCount = async (req, res, next) => {
	try {
		const length = req.user.ticketsCount
		res.json(length)
	} catch (err) {
		console.log(err)
	}
}
