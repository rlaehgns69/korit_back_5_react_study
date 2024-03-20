import instance from "../utils/instance";
export const sendAuthMailRequest = async () => {
  return await instance.post("/mail/send");// header에 jwt토큰 넘어감.
  // 토큰 발행 메일 전송
}