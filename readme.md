#Signup API

obj = {
name,
email,
password,
}

axios.post(`${url}/user/signup`, obj)

#login API
obj = {
email,
password,
}

const login_result = await axios.post(`${url}/user/login`, obj)

"login_result.data.token" this will give the jwt token (currently never expires).

#get tickets api paginated
const allTickets = await axios.get(`${url}/ticket/ticketspage/?pageno=${pageNo}&pagelen=${pageLength}`, {
headers: { Authorization: token },
})

const tickets = allTickets.data;

pageNo is the pageNo'th page from start
and pageLength no of tickets are sent as response

#one additional api to get total number of tickets a user has needs jwt token authorization
axios.get(`${url}/ticket/ticketsCount`, {
headers: { Authorization: token },
})

    	const length = response.data;
    	//console.log(length)


#.env file should have
DB_USERNAME="atlas db username here"
DB_PASSWORD="atlas db password here"
TOKEN_PRIVATE_KEY="anyPrivateKey"


#I added front end to better visualization