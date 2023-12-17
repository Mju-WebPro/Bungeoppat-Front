import axios from "axios";

const request = axios.create({
  baseURL: "http://192.168.17.186:8080",
  // headers: {
  // 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
  // }
});

export default request;
