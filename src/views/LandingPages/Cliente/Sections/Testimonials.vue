<script setup>
import { ref } from 'vue'
const show = ref(false)

function showInfo() {
  console.log(show.value)
  show.value = !show.value
}
</script>
<template>
  <section class="py-md-4 py-2 position-relative">
    <div class="container-fluid mt-6">
      <div class="row">
        <div class="col-md-10 col-sm-12 mx-auto bg-gradient-dark border-radius-lg">
          <div class="row py-md-6 py-3 pt-6">
            <div class="col-xl-4 col-md-6 px-5 position-relative">
              <img class=" border-radius-md img-custom position-relative z-index-2 mt-n7"
                src="@/assets/img/products/banner-medico-con-medico-usando-equipo.jpg" loading="lazy" alt="Medico" />
            </div>

            <div class="col-xl-4 col-md-5 z-index-2 position-relative px-md-3 px-5 my-md-auto mt-4">
              <i class="material-icons text-white text-5xl d-md-block d-none">medical_services</i>
              <p class="text-md-lg text-white">
                Desde que comenzamos a trabajar con esta empresa, hemos notado una mejora significativa
                <p v-if="show" class="text-md-lg text-white mt-n1">
                  en la precisión
                  y confiabilidad de nuestros equipos de monitoreo.
                  Sus accesorios son duraderos, seguros y siempre llegan
                  a tiempo. Una verdadera aliada en el cuidado de nuestros pacientes.
                </p>
                <p class="text-md-lg text-white d-md-block d-none">
                  en la precisión
                  y confiabilidad de nuestros equipos de monitoreo.
                  Sus accesorios son duraderos, seguros y siempre llegan
                  a tiempo. Una verdadera aliada en el cuidado de nuestros pacientes.
                </p>
                <a @click="showInfo()" class="color-default text-sm icon-move-right cursor-pointer d-md-none d-block">
                  <span v-if="!show">Leer Mas...</span>
                  <span v-if="show">Mostar Menos...</span>
                </a>
              </p>
              <p class="text-white font-weight-bold text-sm">
                Clientes -
                <span class="text-xs font-weight-normal">satisfechos</span>
              </p>
              <hr class="vertical start-100 ms-n5 d-xl-block d-none" />
            </div>

            <div class="col-1"></div>
            <div class="col-xl-2 col-12 px-xl-0 px-5 my-xl-auto">
              <h3 class="text-white mt-xl-0 mt-md-5 mt-2">+ 100</h3>
              <p class="text-sm text-white opacity-8">
                Productos en nuestro catalogo.
              </p>
              <a href="#Productos" class="text-white icon-move-right text-sm">Ver Productos
                <i class="fas fa-arrow-right text-xs ms-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.img-custom {
  width: 100%;
  height: 120%;
  object-fit: cover;
}

@media screen and (max-width: 580px) {
  .img-custom {
    height: auto;
  }
}

</style>
