import axios from "axios";

const request = axios.create({
    baseURL: "http://172.16.216.69:8080",
    // headers: {
      // 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    // }
  });

export default request;
