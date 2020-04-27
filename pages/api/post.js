import { API } from "../../components/constants";
import axios from "axios";

module.exports = async (req, res) => {
  await axios
    .post(
      `${API}/Post?username=${req.body.username}&content=${req.body.content}&tags=${req.body.tags}`,
      req.body
    )
    .then((response) =>
      res.json({
        body: response.data,
      })
    )
    .catch((e) => console.log("error:", e));
};
