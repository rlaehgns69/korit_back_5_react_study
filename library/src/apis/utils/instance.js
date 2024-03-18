import axios from "axios";

const instance = axios.create({//axios객체를 직접 세팅
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("AccessToken") // 여기 걸어두면 모든 요청은 8080으로 날아감.
  }// 모든요청 키값 토큰 가져감. Authorization
});

export default instance;