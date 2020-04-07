import { instance } from "./index";

export const fetchBoardList = id =>
  id ? instance.get(`/boards/${id}`) : instance.get("/boards");
export const createBoard = title => instance.post("/boards", { title });
// export const fetchBoard = id => instance.get(`/boards/${id}`);
