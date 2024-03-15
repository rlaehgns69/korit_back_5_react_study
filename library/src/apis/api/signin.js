import instance from "../utils/instance";

export const signinRequest = async (data) => {
    const response = await instance.post("/auth/signin", data); // instance.post 프로미스 리턴 
    return response;
}