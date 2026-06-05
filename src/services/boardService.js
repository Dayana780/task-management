import api from "./api";

export const fetchBoards = async () => {
  const response = await api.get("/boards");
  return response.data;
};

export const createBoard = async (boardData) => {
  const response = await api.post("/boards", boardData);
  return response.data;
};

export const deleteBoard = async (boardId) => {
  const response = await api.delete(`/boards/${boardId}`);
  return response.data;
};

export const updateBoard = async (boardId, boardData) => {
  const response = await api.put(`/boards/${boardId}`, boardData);
  return response.data;
};
