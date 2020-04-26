import { API } from "../../components/constants";
import axios from "axios";

module.exports = async (req, res) => {
  const requestOptions = {
    method: "GET",
    url: API + `Tags?name=${req.query.name}`,
    headers: { "Content-Type": "application/json" },
  };

  await axios(requestOptions).then((response) =>
    res.json({
      body: response.data,
    })
  );
};
