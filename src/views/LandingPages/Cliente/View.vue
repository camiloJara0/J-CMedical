<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "./Components/NavbarDefault.vue";
import DefaultFooter from "./Components/FooterDefault.vue";
import Header from "./Components/Header.vue";
import MaterialAlert from "./Components/MaterialAlert.vue";

//sections
import Information from "./Sections/Information.vue";
import Testimonials from "./Sections/Testimonials.vue";
import AboutUs from "./Sections/AboutUs.vue";
import Productos from "./Sections/Productos.vue";
import { useAppStore } from "../../../stores";
import ContactView from "./Components/ContactView.vue";

//hooks
const body = document.getElementsByTagName("body")[0];

onMounted(() => {
  body.classList.add("coworking");
  body.classList.add("bg-gray-200");

  localStorage.removeItem('token')
  localStorage.removeItem('rol')
  localStorage.removeItem('user')
});

onUnmounted(() => {
  body.classList.remove("coworking");
  body.classList.remove("bg-gray-200");
});

const store = useAppStore()
</script>
<template>
  <div class="container-custom"></div>

  <Header image="/JYC_BANNER (1).png" title="." minHeight="min-vh-100"
  :description="{
    class: 'pe-md-5 me-md-5 opacity-8',
  }" mask="mask bg-gradient-dark opacity-0">
  </Header>

  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault darkText :sticky="true" />
      </div>
    </div>
  </div>

  <div id="Inicio" class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n4 mb-4 pt-6" >
    <Information />
    <Testimonials />
    <AboutUs id="SobreNosotros" />
    <Productos id="Productos" />
    <ContactView id="Contactanos"/>
  </div>

  <DefaultFooter />

  <!-- Alerta -->
  <div class="fondoAlert" v-if="store.showAlert">
    <MaterialAlert :dismissible="true" :color="store.alert.color" fontWeight="bold" class="m-3 mr-5">
      <p class="font-weight-bold m-0">{{ store.alert.texto }}</p>
    </MaterialAlert>
  </div>

</template>

<style scoped>
.contacto {
  background-color: #dd9d5c;
  color: white;
}

.contacto:hover {
  opacity: 0.75;
  color: white;
}

.btn-custom {
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #0000ff;
  text-transform: uppercase;
  font-size: small;
  font-weight: bold;
}

.container-custom {
  /* background: linear-gradient(180deg,rgba(244, 244, 244, 1) 3%, rgba(34, 98, 163, 1) 40%, rgba(235, 237, 240, 1) 100%); */
  background: #FFFFFF;
  background: linear-gradient(180deg,rgba(255, 255, 255, 1) 59%, rgba(237, 239, 242, 1) 91%);
  height: 160vh;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
  overflow-x: hidden;
}

.fondo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 105099999999;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  overflow-y: none;
}

.fondoAlert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 105099999999;
  display: flex;
  justify-content: end;
  align-items: start;
  overflow-y: none;
}

.container-contacto {
  display: flex;

}
</style>
