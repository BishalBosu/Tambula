const url = "http://localhost:3000"

function logOut() {
	window.location.href = "login.html"
	localStorage.removeItem("token")
	localStorage.removeItem("name")
}

async function addOneTicket() {
	try {
		const token = localStorage.getItem("token")

		const ticketAdded = await axios.post(
			`${url}/ticket/add-ticket`,
			{},
			{
				headers: { Authorization: token },
			}
		)

		const response = await axios.get(`${url}/ticket/ticketsCount`, {
			headers: { Authorization: token },
		})

		console.log(response.data)

		document.getElementById(
			"ticketsCount"
		).innerText = `Tickets: ${response.data}`
	} catch (err) {
		console.log(err)
	}
}

function showItem(obj) {
	let table = "<table>"

	// Generate table header
	table += "<thead><tr>"
	table += "<th>Ticket ID</th>"
	table += "<th>Values</th>"
	table += "</tr></thead>"

	// Generate table body
	table += "<tbody>"
	obj.forEach((ticket) => {
		table += "<tr>"

			table += `<td>${ticket._id}&nbsp&nbsp&nbsp</td>&nbsp&nbsp&nbsp`
			table += '<td><table class="inner-table">'
			ticket.ticket.forEach((row) => {
				table += "<tr>"
				row.forEach((value) => {
					table += `<td>${value} &nbsp&nbsp&nbsp</td>`
				})
				table += "</tr>"
			})
			table += "</table><br></td>"

		table += "</tr>"
	})
	table += "</tbody>"

	table += "</table>"

	document.getElementById("tickets-container").innerHTML += table
}
