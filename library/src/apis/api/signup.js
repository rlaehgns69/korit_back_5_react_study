import instance from "../utils/instance"

export const signupRequest = async (data) => {
  try {
    const response = instance.post("/auth/signup", data); // axios대체
    return response;
  } catch(error) {
    console.log(error);
    return error.response;
  }
}