import { createRouter, createWebHistory } from "vue-router";
import view from "../views/LandingPages/Cliente/View.vue"
import Products from "../views/LandingPages/Cliente/Products.vue";

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
      path: '/Catalogo',
      name: 'productos',
      component: Products
    }
  ],
});

export default router;
