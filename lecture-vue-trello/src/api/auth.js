import { instance } from "./index";

export const loginAuth = loginData => instance.post("/login", loginData);
