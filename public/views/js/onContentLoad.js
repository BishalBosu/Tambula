window.addEventListener("DOMContentLoaded", async (event) => {
	if (!localStorage.getItem("token")) {
		return (window.location.href = "login.html")
	}

	try {
        const token = localStorage.getItem("token");
		const response = await axios.get(`${url}/ticket/ticketsCount`, {
			headers: { Authorization: token },
		})

        console.log(response.data);

        document.getElementById("ticketsCount").innerText = `Tickets: ${response.data}`
	} catch (err) {
		console.log(err)
	}

	document.getElementById("selectLen").addEventListener("input", setPageLen)

	//default values
	let prev = 0
	let next = 4

	//first we load for page 1 by default
	getFor(1)

	//adding eventlistners to the pagination buttons
	const prev_li = document.getElementById("prev-li")
	prev_li.addEventListener("click", async (event1) => {
		let prev_next = getForPev(prev, one_li, two_li, three_li)

		prev = prev_next.prev
		next = prev_next.next
	})

	const one_li = document.getElementById("one-li")
	one_li.addEventListener("click", async (event1) => {
		const integer_oneli_value = one_li.innerText * 1
		getFor(integer_oneli_value)
	})

	const two_li = document.getElementById("two-li")
	two_li.addEventListener("click", async (event1) => {
		const integer_twoli_value = two_li.innerText * 1
		getFor(integer_twoli_value)
	})

	const three_li = document.getElementById("three-li")
	three_li.addEventListener("click", async (event1) => {
		const integer_threeli_value = three_li.innerText * 1
		getFor(integer_threeli_value)
	})
	const next_li = document.getElementById("next-li")
	next_li.addEventListener("click", async (event1) => {
		let prev_next = await getForNext(next, one_li, two_li, three_li)
		prev = prev_next.prev
		next = prev_next.next
	})
})
