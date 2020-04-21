import { API } from '../../components/constants'
import axios from 'axios'

module.exports = async (req, res) => {
	const requestOptions = {
		method: 'POST',
		url: API,
		headers: { 'Content-Type': 'application/json' },
		data: req.body,
	}

	await axios(requestOptions)
		.then(response => res.json({
			body: response.data,
		}))
}