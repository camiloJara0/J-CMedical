import { createRouter, createWebHistory } from "vue-router";
import view from "../views/LandingPages/Cliente/View.vue"
import login from "../views/Authentication/SignIn/login.vue";
import ViewAdmin from "../views/LandingPages/Admin/ViewAdmin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "presentation",
      component: view,
    },
    {
      path: "/inicio_sesion",
      component: login,
    },
    {
      path: "/Admin",
      component: ViewAdmin,
    },
  ],
});

export default router;
