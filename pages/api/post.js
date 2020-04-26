import { API } from "../../components/constants";
import axios from "axios";

module.exports = async (req, res) => {
  await axios
    .post(`${API}/Post`, req.body)
    .then((response) =>
      res.json({
        body: response.data,
      })
    )
    .catch((e) => console.log("error:", e));
};
