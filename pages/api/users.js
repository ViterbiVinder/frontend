import { API } from '../../components/constants'
import axios from 'axios'

module.exports = async (req, res) => {
	const requestOptions = {
		method: 'GET',
		url: API + `Users`,
		headers: { 'Content-Type': 'application/json' },
	}

	await axios(requestOptions)
		.then(response => {
			res.json({
				body: response.data
			})}).catch((e) => {
			res.json({error: "Error: Server unavailable"})
		})
}