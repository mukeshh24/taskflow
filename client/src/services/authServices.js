import apiInstance from "@/api/apiInstance";

export const userRegister = async (payload) => {
  const response = await apiInstance.post("/user/register", payload);
  return response.data;
};

export const userLogin = async (payload) => {
  const response = await apiInstance.post("/user/login", payload);
  return response.data;
};

export const userLogout = async () => {
  const response = await apiInstance.get("/user/logout");
  return response.data;
};

export const userProfileUpdate = async (payload) => {
  const response = await apiInstance.put("/user/profile", payload);
  return response.data;
};

export const userDelete = async () => {
  const response = await apiInstance.delete("/user/profile");
  return response.data;
};
