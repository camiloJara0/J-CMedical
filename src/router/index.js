import { createRouter, createWebHistory } from "vue-router";
import view from "../views/LandingPages/Cliente/View.vue"
import login from "../views/Authentication/SignIn/login.vue";
import ViewAdmin from "../views/LandingPages/Admin/ViewAdmin.vue";
import Productos from "../views/LandingPages/Admin/Sections/Productos.vue";
import Categorias from "../views/LandingPages/Admin/Sections/Categorias.vue";
import Cotizaciones from "../views/LandingPages/Admin/Sections/Cotizaciones.vue";
import Usuarios from "../views/LandingPages/Admin/Sections/Usuarios.vue";
import AdminLayout from "../layouts/sections/Admin.vue";

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
      component: AdminLayout,   // Layout padre
      children: [
        {
          path: "",     // /Admin/
          name: "Inicio",
          component: ViewAdmin,
        },
        {
          path: "Productos",     // /Admin/Productos
          name: "productos",
          component: Productos,
        },
        {
          path: "Categorias",     // /Admin/Categorias
          name: "Categorias",
          component: Categorias,
        },
        {
          path: "Cotizaciones",     // /Admin/Cotizaciones
          name: "Cotizaciones",
          component: Cotizaciones,
        },
        {
          path: "Usuarios",     // /Admin/Usuarios
          name: "Usuarios",
          component: Usuarios,
        },
        // aquí puedes añadir más secciones como Categorías, Cotizaciones, Usuarios
      ],
    },

  ],
});

export default router;
