import { createRouter, createWebHistory } from "vue-router";
import CoworkingView from "../views/LandingPages/Coworking/CoworkingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "presentation",
      component: CoworkingView,
    },
    {
      path: "/pages/landing-pages/coworking",
      name: "coworking",
      component: CoworkingView,
    },
  ],
});

export default router;
