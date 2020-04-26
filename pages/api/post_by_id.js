import { API } from '../../components/constants'
import axios from 'axios'

module.exports = async (req, res) => {
	const requestOptions = {
		method: 'GET',
		url: API + `Posts?username=${req.body.username}&password=${req.body.password}`,
		headers: { 'Content-Type': 'application/json' },
	}

	console.log(API + `Auth?username=${req.body.username}&password=${req.body.password}`)

	await axios(requestOptions)
		.then(response => res.json({
			body: response.data,
		}))
}