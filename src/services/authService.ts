import api from "../api/axios";

export const loginUserService = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response?.data;
};

export const resetPasswordService = (email: string, newPassword: string) => {
  return api.post("/auth/reset-password", { email, newPassword });
};

export const registerUserService = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  return api.post("/auth/register", { email, password, firstName, lastName });
};
