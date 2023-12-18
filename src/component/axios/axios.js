import axios from "axios";

const request = axios.create({
  baseURL: "http://192.168.0.2:8080",
  // headers: {
  // 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
  // }
});

export default request;
