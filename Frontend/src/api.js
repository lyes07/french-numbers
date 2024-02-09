import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:7890/api/v1",
});
