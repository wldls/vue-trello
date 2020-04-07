import axios from "axios";
// import router from "@/routes/index";

// const DOMAIN = "http://localhost:3000";
// const UNAUTHORIZED = 401;
// const onUnauthrorized = () => {
//   router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`);
// };

export const instance = axios.create({
  baseURL: "http://localhost:3000"
});

export const setAuthInHeader = token => {
  instance.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null;
};

// const request = (method, url, data) => {
//   return axios({
//     method,
//     url: DOMAIN + url,
//     data
//   }).then(res => res.data);
//   // .catch(res => {
//   //   const { status } = res.response;
//   //   if (status === UNAUTHORIZED) return onUnauthrorized();
//   //   throw Error(res);
//   // });
// };

// const { token } = localStorage;
// if (token) setAuthInHeader(token);

// export const board = {
//   fetch() {
//     return request("get", "/boards");
//   },
//   create(title) {
//     return request("post", "/boards", { title });
//   }
// };

// export const auth = {
//   login(email, password) {
//     return request("post", "/login", { email, password });
//   }
// };
