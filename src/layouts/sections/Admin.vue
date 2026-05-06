<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "@/views/LandingPages/Admin/Components/NavbarDefault.vue";
import DefaultFooter from "@/views/LandingPages/Admin/Components/FooterDefault.vue";
import MaterialAlert from "@/views/LandingPages/Cliente/Components/MaterialAlert.vue";

//sections
import { useAppStore } from "@/stores";

//hooks
const body = document.getElementsByTagName("body")[0];

onMounted(() => {
  body.classList.add("coworking");
  body.classList.add("bg-gray-200");
});

onUnmounted(() => {
  body.classList.remove("coworking");
  body.classList.remove("bg-gray-200");
});

const store = useAppStore()
function cerrarModal() {
  store.showModal = false
}
</script>
<template>
  <div class="container-custom"></div>

  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault darkText :sticky="true" />
      </div>
    </div>
  </div>

  <main id="Inicio" class="card card-body blur shadow-blur mx-3 mx-md-4 mt-6 mb-4 py-sm-6 py-2" >
    <router-view />
  </main>

  <DefaultFooter />

  <!-- Alerta -->
  <div class="fondoAlert" v-if="store.showAlert">
    <MaterialAlert :dismissible="true" :color="store.alert.color" fontWeight="bold" class="m-3 mr-5">
      <p class="font-weight-bold m-0">{{ store.alert.texto }}</p>
    </MaterialAlert>
  </div>

</template>
