import axios from "axios";

const instance = axios.create({
  baseURL: "http://188.166.23.205:8000/api/v1",
});

export default instance;
