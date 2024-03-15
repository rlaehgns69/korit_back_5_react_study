import axios from "axios";

const instance = axios.create({//axios객체를 직접 세팅
  baseURL: "http://localhost:8080"
});

export default instance;