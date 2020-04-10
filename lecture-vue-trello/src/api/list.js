import { instance } from "./index";

export const createList = payload => instance.post("/lists", payload);
