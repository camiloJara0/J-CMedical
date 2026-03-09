<script setup>
import { RouterLink } from "vue-router";
import { ref, watch, onMounted, onBeforeMount } from "vue";
import { useWindowsWidth } from "../../../../assets/js/useWindowsWidth";

// images
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";

const props = defineProps({
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
    default: () => ({
      route: "https://www.creative-tim.com/product/vue-material-kit-pro",
      color: "bg-gradient-success",
      label: "Buy Now"
    })
  },
  transparent: {
    type: Boolean,
    default: false
  },
  light: {
    type: Boolean,
    default: false
  },
  dark: {
    type: Boolean,
    default: false
  },
  sticky: {
    type: Boolean,
    default: false
  },
  darkText: {
    type: Boolean,
    default: false
  }
});

// set arrow  color
function getArrowColor() {
  if (props.transparent && textDark.value) {
    return ArrDark;
  } else if (props.transparent) {
    return DownArrWhite;
  } else {
    return ArrDark;
  }
}

// set text color
const getTextColor = () => {
  let color;
  if (props.transparent && textDark.value) {
    color = "text-dark";
  } else if (props.transparent) {
    color = "text-white";
  } else {
    color = "text-dark";
  }

  return color;
};

// set nav color on mobile && desktop

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
  textDark.value = false;
}

watch(
  () => type.value,
  (newValue) => {
    if (newValue === "mobile") {
      textDark.value = true;
    } else {
      textDark.value = false;
    }
  }
);

const navbarAbierto = ref(false);
function showNav () {
  navbarAbierto.value = !navbarAbierto.value
}

</script>
<template>
  <nav class="navbar navbar-expand-lg top-0" :class="{
    'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3':
      props.transparent,
    'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-md-4 mx-2 position-absolute mt-2':
      props.sticky,
    'navbar-light bg-white py-3': props.light,
    ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark,
    'custom-nav': !navbarAbierto
  }">
    <div :class="props.transparent || props.light || props.dark
        ? 'container'
        : 'container-fluid px-0'
      ">
      <RouterLink class="navbar-brand d-none d-md-block" :class="[
        (props.transparent && textDark) || !props.transparent
          ? 'text-dark font-weight-bolder ms-sm-3'
          : 'font-weight-bolder text-lg ms-sm-3'
      ]" :to="{ name: 'presentation' }" rel="tooltip" title="Nombre Compañia" data-placement="bottom">
        <img src="src/assets/img/products/jyc_logo.png" width="20" alt="Logo J&C Medical"/>
        <span class="color-default">Panel de Administracion</span>
      </RouterLink>

      <button class="navbar-toggler shadow-none ms-2 bg-white" type="button" data-bs-toggle="collapse" @click="showNav"
        data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>

      <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0" id="navigation">
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a href="/Admin/Cotizaciones" role="button" class="nav-link ps-2 d-flex cursor-pointer align-items-center" :class="getTextColor()">
              <i class="material-icons opacity-6 me-2 text-md" :class="getTextColor()">contacts</i>
              Solicitudes Cotizacion
            </a>
          </li>
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a href="/Admin/Categorias" role="button" class="nav-link ps-2 d-flex cursor-pointer align-items-center" :class="getTextColor()">
              <i class="material-icons opacity-6 me-2 text-md" :class="getTextColor()">view_day</i>
              Categorias
            </a>
          </li>
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a href="/Admin/Productos" role="button" class="nav-link ps-2 d-flex cursor-pointer align-items-center" :class="getTextColor()">
              <i class="material-icons opacity-6 me-2 text-md" :class="getTextColor()">view_day</i>
              Productos
            </a>
          </li>
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a href="/inicio_sesion" role="button" class="nav-link ps-2 d-flex cursor-pointer align-items-center" :class="getTextColor()">
              <i class="material-icons opacity-6 me-2 text-md" :class="getTextColor()">account_circle</i>
              Iniciar Sesión
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<style scoped>
.nav-link:hover {
  color: #264e78 !important;
}

@media screen and (max-width: 768px) {
  .custom-nav {
    box-shadow: none !important;
    background-color: inherit !important;
    backdrop-filter: none;
  }
}
</style>
