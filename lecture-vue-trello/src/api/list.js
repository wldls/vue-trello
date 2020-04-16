import { instance } from "./index";

export const createList = payload => instance.post("/lists", payload);
export const editList = (id, payload) => instance.put(`/lists/${id}`, payload);
export const delList = id => instance.delete(`/lists/${id}`);
