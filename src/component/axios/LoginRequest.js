import request from "./axios";

export const LoginGoogle = async (data) => {
  return await request.post(`/login/oauth2/code/google?token=${data}`);
};
