import { useEffect, useState } from "react";
import {
  createTaskService,
  deleteTaskService,
  editTaskService,
  searchTaskService,
  taskListService,
  toggleStatusService,
} from "../services/taskService";
import type { Task } from "../types/user";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useTasks = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskLoadingState, setTaskLoadingState] = useState(true);
  const [createTaskLoadingState, setCreateTaskLoadingState] = useState(false);

  const fetchTasks = async () => {
    setTaskLoadingState(true);
    try {
      const response = await taskListService();
      setTaskList(response);
      return true;
    } catch {
      toast.error("Error fetching tasks");
    } finally {
      setTaskLoadingState(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTaskLoadingState(true);
        const response = await taskListService();
        setTaskList(response);
      } catch {
        toast.error("Error fetching tasks");
      } finally {
        setTaskLoadingState(false);
      }
    };

    fetchData();
  }, []);

  const resetTaskList = async () => {
    await fetchTasks();
  };

  const createTask = async (title: string) => {
    if (!title.trim()) {
      toast.error("Task title cannot be empty");
      return false;
    }

    setCreateTaskLoadingState(true);
    try {
      const response = await createTaskService(title);
      setTaskList((prev) => [...prev, response]);
      toast.success("Task created successfully");
      return true;
    } catch {
      toast.error("Error creating task");
      return false;
    } finally {
      setCreateTaskLoadingState(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskService(id);
      const updatedTaskList = taskList.filter((task) => task._id !== id);
      setTaskList(updatedTaskList);
      toast.success("Task deleted successfully");
    } catch {
      toast.error("Error deleting task");
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      const updatedTask = await toggleStatusService(id);
      const updatedTaskList = taskList.map((task) => {
        if (task._id === updatedTask._id) {
          return updatedTask;
        }
        return task;
      });
      setTaskList(updatedTaskList);
      toast.success("Task status updated successfully");
    } catch {
      toast.error("Error toggling task status");
    }
  };

  const editTask = async (id: string, title: string) => {
    try {
      const response = await editTaskService(id, title);
      const updatedTaskList = taskList.map((task) => {
        if (task._id === response._id) {
          return response;
        }
        return task;
      });
      setTaskList(updatedTaskList);
      toast.success("Task edited successfully");
    } catch {
      toast.error("Error editing task");
    }
  };

  const searchTask = async (title: string) => {
    try {
      const response = await searchTaskService(title);
      setTaskList([response]);
    } catch (error) {
      const err = error as AxiosError<{ msg: string }>;
      toast.error(err?.response?.data?.msg || "Error searching task");
    }
  };

  return {
    taskList,
    taskLoadingState,
    createTask,
    createTaskLoadingState,
    deleteTask,
    toggleStatus,
    editTask,
    searchTask,
    resetTaskList,
  };
};
