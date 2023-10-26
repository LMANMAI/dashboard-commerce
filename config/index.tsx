import axios from "axios";
const instance = axios.create({
  // baseURL: import.meta.env.VITE_URL_EP,
  baseURL: "http://localhost:4000/sneaker",
});
export default instance;
