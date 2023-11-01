import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_URL_EP,
  // baseURL: "http://localhost:4000/sneaker",
});

instance.interceptors.request.use((request) => {
  console.log("Request:", request);
  return request;
});

instance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Error:", error);
    return Promise.reject(error);
  }
);

export default instance;
