import axios from "axios";

const instance = axios.create({
  baseURL: "https://fathomless-wave-88354.herokuapp.com",
});

export default instance;
