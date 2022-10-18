import axios from "axios";

const aesName = axios.create({
  baseURL: "/api",
});

export default aesName;
