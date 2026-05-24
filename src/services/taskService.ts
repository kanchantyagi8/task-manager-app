import api from "../api/axios";
import type { Task } from "../types/user";

export const toggleStatusService = async (id: string): Promise<Task> => {
  const response = await api.patch("/auth/toggle-status", { id });
  return response?.data;
};

export const deleteTaskService = (id: string) => {
  return api.delete("/auth/delete-task", {
    data: { id },
  });
};

export const editTaskService = async (
  id: string,
  title: string,
): Promise<Task> => {
  const response = await api.patch("/auth/edit-task", { id, title });
  return response?.data;
};

export const taskListService = async (): Promise<Task[]> => {
  const response = await api.get("/auth/task-list");
  return response?.data;
};

export const createTaskService = async (title: string): Promise<Task> => {
  const response = await api.post("/auth/create-task", { title });
  return response?.data;
};

export const searchTaskService = async (title: string): Promise<Task> => {
  const response = await api.post("/auth/search-task", { title });
  return response?.data;
};
