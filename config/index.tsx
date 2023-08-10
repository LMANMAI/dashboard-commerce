import axios from "axios";
const instance = axios.create({
  baseURL: "https://sneakeers-qvro5v3zp-lmanmai.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
