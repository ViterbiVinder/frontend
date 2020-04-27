import { API } from "../../components/constants";
import axios from "axios";

module.exports = async (req, res) => {
  let url = `${API}Tags`;

  if (req.query.name || req.body.name) {
    url += `?name=${req.query.name}`;
  }

  const requestOptions = {
    method: "GET",
    url: url,
    headers: { "Content-Type": "application/json" },
  };

  await axios(requestOptions).then((response) =>
    res.json({
      body: response.data,
    })
  );
};
