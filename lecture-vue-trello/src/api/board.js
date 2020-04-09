import { instance } from "./index";

export const fetchBoardList = id =>
  id ? instance.get(`/boards/${id}`) : instance.get("/boards");
export const createBoard = title => instance.post("/boards", { title });
export const createCard = data => instance.post("/cards", data);
export const fetchCard = id => instance.get(`/cards/${id}`);
export const editCard = (id, payload) => instance.put(`/cards/${id}`, payload);
export const delCard = id => instance.delete(`/cards/${id}`);
