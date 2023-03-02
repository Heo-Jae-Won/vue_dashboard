import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { setupGuard } from "./routerguard";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/board/list",
    name: "list",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about", webpackPrefetch:true */ "../views/BoardListView.vue"),
  },
  {
    path: "/board/insert",
    name: "insert",
    component: () => import(/* webpackChunkName: "insert" */ "../views/BoardInsertView.vue"),
  },
  {
    path: "/board/read/:boardNo",
    name: "read",
    component: () => import(/* webpackChunkName: "read" */ "../views/BoardReadView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/user/:userId",
    name: "info",
    component: () => import(/* webpackChunkName: "info" */ "../views/UserInfoView.vue"),
  },
  {
    path: "/user/password",
    name: "password",
    component: () => import(/* webpackChunkName: "info" */ "../views/UserPasswordView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
setupGuard(router);

export default router;
