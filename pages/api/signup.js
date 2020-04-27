import { API } from "../../components/constants";
import axios from "axios";

module.exports = async (req, res) => {
  const requestOptions = {
    method: "POST",
    url:
      API +
      `Auth?username=${encodeURI(req.body.username)}&password=${encodeURI(
        req.body.password
      )}&email=${req.body.email}&bio=${encodeURI(
        req.body.bio
      )}&name=${encodeURI(req.body.name)}&avatar=${encodeURI(req.body.avatar)}`,
    headers: { "Content-Type": "application/json" },
    data: req.body,
  };

  await axios(requestOptions).then((response) => {
    return res.json({
      body: response.data,
    });
  });
};
