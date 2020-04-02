import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import LoginPage from "@/components/LoginPage";
import Board from "@/components/Board";
import Card from "@/components/Card";
import NotFound from "@/components/NotFound";

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  const isAuth = localStorage.getItem("token");

  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;
  isAuth ? next() : next(loginPath);
};

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home, beforeEnter: requireAuth },
    { path: "/login", component: LoginPage },
    {
      path: "/b/:bid",
      component: Board,
      children: [{ path: "c/:cid", component: Card }]
    },
    { path: "*", component: NotFound }
  ]
});

export default router;
