import instance from "../utils/instance";

export const signinRequest = (data) => {
    const response = instance.post("/auth/signin", data);
    return response;
}