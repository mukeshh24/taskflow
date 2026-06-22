import apiInstance from "@/api/apiInstance";

export const addTask = async (payload) => {
  const response = await apiInstance.post("/tasks/add", payload);
  return response.data;
};

export const getAllTask = async () => {
  const response = await apiInstance.get("/tasks/all");
  return response.data;
};

export const editTask = async (taskId, payload) => {
  const response = await apiInstance.put(`/tasks/all/${taskId}`, payload);
  return response.data;
};

export const taskDelete = async (taskId) => {
  const response = await apiInstance.delete(`/tasks/all/${taskId}`);
  return response.data;
};
