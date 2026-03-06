<script setup>
import logoDark from "@/assets/img/logo-ct-dark.png";
defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "J&C MEDICAL",
      logo: logoDark,
      route: "/",
    }),
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fab fa-facebook text-lg opacity-8"></i>',
        link: "https://www.facebook.com/CreativeTim/",
      },
      {
        icon: '<i class="fab fa-twitter text-lg opacity-8"></i>',
        link: "https://twitter.com/creativetim",
      },
      {
        icon: '<i class="fab fa-dribbble text-lg opacity-8"></i>',
        link: "https://dribbble.com/creativetim",
      },
      {
        icon: '<i class="fab fa-github text-lg opacity-8"></i>',
        link: "https://github.com/creativetimofficial",
      },
      {
        icon: '<i class="fab fa-youtube text-lg opacity-8"></i>',
        link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
      },
    ],
  },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String,
    },
    default: () => [
      {
        name: "Compañia",
        items: [
          {
            name: "Acerca de Nosotros",
            href: "#SobreNosotros",
            target: ''
          },
          {
            name: "Productos",
            href: "#Productos",
            target: ''
          },
          {
            name: "Inicio",
            href: "#Inicio",
            target: ''
          },
        ],
      },
      {
        name: "Ayuda y Soporte",
        items: [
          {
            name: "Contactanos",
            href: "#Contactanos",
            target: '',
          },
          {
            name: "Facebook",
            href: "https://www.facebook.com/",
            target: '_blank',
          },
          {
            name: "Instagram",
            href: "https://www.instagram.com/",
            target: '_blank',
          },
          {
            name: "Gmail",
            href: "https://mail.google.com/",
            target: '_blank',
          },
        ],
      },
      {
        name: "legal",
        items: [
          {
            name: "terms & conditions",
            target: '_blank',
          },
          {
            name: "privacy policy",
            target: '_blank',
          },
          {
            name: "licenses (EULA)",
            target: '_blank',
          },
        ],
      },
    ],
  },
});
</script>
<template>
  <footer class="footer pt-5 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-3 mb-4">
          <div class="footer-custom">
            <a :href="brand.route">
              <img src="src/assets/img/products/jyc_logo.png" width="130" alt="Logo J&C Medical"
                class="mb-md-3 mb-n3 footer-logo" />
            </a>
            <h6 class="font-weight-bolder mb-md-4 d-md-block d-none">J&C MEDICAL</h6>
          </div>
          <div>
            <ul class="d-flex flex-row ms-n3 nav">
              <li class="nav-item" v-for="{ icon, link } of socials" :key="link">
                <a class="nav-link pe-1" :href="link" v-html="icon">
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 col-sm-6 col-6 mb-4 d-md-block d-none" v-for="{ name, items } of menus" :key="name">
          <h6 class="text-sm">{{ name }}</h6>
          <ul class="flex-column ms-n3 nav">
            <li class="nav-item" v-for="item of items" :key="item.name">
              <a class="nav-link" :href="item.href" :target="item.target">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <div class="col-12">
          <div class="text-center">
            <p class="text-dark my-4 text-sm font-weight-normal">
              Todos los derechos reservados. Copyright ©
              {{ new Date().getFullYear() }}
              J&C MEDICAL
              <a target="_blank">Compañia</a>.
            </p>
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>
<style scoped>
.footer-logo {
  max-width: 3rem !important;
  margin-bottom: 0;
}

@media screen and (max-width: 768px) {
  .footer-custom {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer-logo {
    max-width: 6rem !important;
    margin-bottom: 0;
  }
}
</style>
