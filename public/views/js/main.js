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
	// Create an HTML table string
	let tableHTML = "<table>"
	for (const [ticket, data] of Object.entries(obj)) {
		tableHTML += '<tr><th colspan="9">' + ticket + "</th></tr>"
		for (const row of data) {
			tableHTML += "<tr>"
			for (const cell of row) {
				tableHTML += "<td>" + cell + "&nbsp;&nbsp;&nbsp; </td>"
			}
			tableHTML += "</tr>"
		}
	}
	tableHTML += "</table>"

	document.getElementById("tickets-container").innerHTML += tableHTML
}
