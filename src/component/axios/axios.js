import axios from "axios";

const request = axios.create({
    baseURL: "https://ec2-3-35-203-41.ap-northeast-2.compute.amazonaws.com:8080/",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    }
  });

export default request;
