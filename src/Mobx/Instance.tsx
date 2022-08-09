import axios from "axios";

const instance = axios.create({
  baseURL: "http://188.166.23.205:8000/v1",
});

export default instance;
