import { API } from '../../components/constants'
import axios from 'axios'

module.exports = async (req, res) => {
	const requestOptions = {
		method: 'POST',
		url: API + `Auth?username=${req.body.username}&password=${req.body.password}
		&email=${req.body.email}&bio=${req.body.bio}&name=${req.body.name}&avatar=test}`,
		headers: { 'Content-Type': 'application/json' },
		data: req.body,
	}

	await axios(requestOptions)
		.then(response => res.json({
			body: response.data,
		}))
}