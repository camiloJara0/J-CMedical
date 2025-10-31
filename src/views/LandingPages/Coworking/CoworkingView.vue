<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import image from '@/assets/img/products/banner-medico-con-medico-usando-equipo.jpg'

//example components
import NavbarDefault from "../../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../../examples/footers/FooterDefault.vue";
import Header from "../../../examples/Header.vue";

//Vue Material Kit 2 Pro components
import MaterialButton from "../../../components/MaterialButton.vue";

//sections
import Information from "./Sections/CoworkingInformation.vue";
import Testimonials from "./Sections/CoworkingTestimonials.vue";
import AboutUs from "./Sections/CoworkingAboutUs.vue";
import Places from "./Sections/CoworkingPlaces.vue";
import { useAppStore } from "../../../stores";

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
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault darkText :sticky="true" />
      </div>
    </div>
  </div>

  <Header image="https://cdn-blog.joinnus.com/blog/wp-content/uploads/2017/09/tecnologia-header.jpg" title="J&C Medical"
    :description="{
      text: 'Tecnología confiable para el cuidado de la vida.',
      class: 'pe-md-5 me-md-5 opacity-8',
    }" mask="mask bg-gradient-dark opacity-5">
    <div class="buttons">
      <MaterialButton variant="gradient" color="" class="mt-4 contacto">Contacto</MaterialButton>
      <MaterialButton color="none" class="mt-4 text-white shadow-none">Sobre Nosotros</MaterialButton>
    </div>
  </Header>

  <div id="Inicio" class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
    <Information />
    <Testimonials />
    <AboutUs id="SobreNosotros" />
    <Places id="Productos" />

    <div id="Contactanos" class="container">
      <div class="my-10 py-5 bg-gradient-dark position-relative border-radius-xl" 
      :style="{ backgroundImage: 'url(public/banner-medico-con-medico-usando-equipo.jpg)',}" 
      loading="lazy">
        <div class="container position-relative z-index-2">
          <div class="row">
            <div class="col-lg-5 col-md-8 m-auto text-start">
              <h5 class="text-white mb-lg-0 mb-5">
                ¿Buscas un accesorio específico?<br />
                <span class="text-sm">Contáctanos y te ayudamos a encontrar la solución ideal para tu equipo.</span>
              </h5>
            </div>
            <div class="col-lg-6 m-auto">
              <div class="row">
                <div class="col-sm-4 col-6 ps-sm-0 ms-auto">
                  <button class="btn-custom">
                    Contactanos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <DefaultFooter />

  <div class="fondo" v-if="store.showModal">
    <div class="modal-custom">
      <div class="header-modal-custom">
        <h3>{{ store.informacion.title }}</h3>
        <button @click="cerrarModal()" type="button" class="btn-close text-xl py-3 opacity-10" data-bs-dismiss="alert"
          aria-label="Close">
          <span aria-hidden="true" class="text-xl font-weight-bold text-dark">&times;</span>
        </button>
      </div>
      <div class="header-modal-body">
        <img :src="store.informacion.image" alt="" loading="lazy">
        <img v-for="image in store.informacion.images" :src="image" alt="" loading="lazy">
      </div>
    </div>
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
  padding: 5px 45px;
  color: white;
  background-color: #0000ff;
  text-transform: uppercase;
  font-size: small;
  font-weight: bold;
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

.modal-custom {
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
}

.header-modal-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header-modal-custom h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #ff4d4d;
}

.header-modal-body {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.header-modal-body img {
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 8px;
}
</style>
