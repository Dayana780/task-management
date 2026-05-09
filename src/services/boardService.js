import api from "./api";

// دریافت لیست بردها
export const fetchBoards = async () => {
  const response = await api.get("/boards");
  return response.data;
};

// ساخت برد جدید
export const createBoard = async (boardData) => {
  const response = await api.post("/boards", boardData);
  return response.data;
};

// حذف برد
export const deleteBoard = async (boardId) => {
  const response = await api.delete(`/boards/${boardId}`);
  return response.data;
};

// ویرایش برد
export const updateBoard = async (boardId, boardData) => {
  const response = await api.put(`/boards/${boardId}`, boardData);
  return response.data;
};
