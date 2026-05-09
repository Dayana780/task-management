import api from "./api";

// دریافت تسک‌های یک برد
export const fetchTasksByBoard = async (boardId) => {
  const response = await api.get(`/tasks?boardId=${boardId}`);
  return response.data;
};

// ساخت تسک جدید
export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

// تغییر وضعیت تسک
export const updateTaskStatus = async (taskId, newStatus) => {
  const response = await api.patch(`/tasks/${taskId}`, { status: newStatus });
  return response.data;
};

// حذف تسک
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
