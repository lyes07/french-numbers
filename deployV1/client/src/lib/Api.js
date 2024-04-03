import axios from "axios";

export default axios.create({
  baseURL: "https://french-numbers-backend.onrender.com/api/v1",
});
