<script setup>
import AboutUsOption from "../Components/AboutUsOption.vue";
import { ref } from 'vue'
const show = ref(false)

function showInfo() {
  console.log(show.value)
  show.value = !show.value
}
</script>
<template>
  <section class="py-sm-7 py-4">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <h3 class="mt-2">Acerca de Nosotros</h3>
          <h5 class="d-md-block d-none">Comprometidos con la innovación y la seguridad clínica</h5>
          <p>
            Somos una empresa dedicada a proveer accesorios médicos de alta calidad, con un enfoque en la innovación
            tecnológica y la seguridad del paciente. Nuestro equipo está conformado por profesionales con experiencia en
            ingeniería biomédica, logística hospitalaria y atención al cliente, lo que nos permite ofrecer soluciones
            integrales y confiables.
          <p v-if="show">
            Creemos que cada componente cuenta cuando se trata de salvar vidas. Por eso, trabajamos con proveedores
            certificados y realizamos controles de calidad rigurosos para garantizar que cada producto cumpla con los
            más altos estándares internacionales.
          </p>

          </p>
          <a @click="showInfo()" class="color-default text-sm icon-move-right cursor-pointer ">
            <span v-if="!show">Conoce Mas...</span>
            <span v-if="show">Mostar Menos...</span>
          </a>
        </div>
        <div class="col-lg-6 mt-lg-0 mt-5 ps-lg-0 ps-0 ms-auto">
          <AboutUsOption icon="mediation"
            content="Siempre estamos explorando nuevas tecnologías para mejorar nuestros productos." />
          <AboutUsOption icon="settings_overscan"
            content="Todos nuestros accesorios cumplen con normativas internacionales de seguridad médica." />

          <AboutUsOption icon="token"
            content="Brindamos asesoría directa para encontrar la solución ideal según tus necesidades clínicas." />
        </div>
      </div>

      <div class="p-md-5 mt-md-7 mt-4">
        <div class="row g-4 align-items-start">
          <!-- Misión -->
          <div class="col-lg-6 col-12">
            <div class="p-4 rounded-6 shadow text-white min-h-100 infoMV bg-custom-oscuro">
              <h3 class="mb-3 d-flex align-items-center text-white">
                <i class="material-icons me-2 color-warning">favorite</i> Misión
              </h3>
              <p class="mb-0">
                En <strong>J&C MEDICAL</strong> nos dedicamos a proveer soluciones confiables en tecnología biomédica,
                ofreciendo accesorios de monitoreo de alta calidad y servicios especializados de mantenimiento y
                reparación.
                Nuestro compromiso es contribuir al óptimo funcionamiento de los equipos médicos, apoyando así la labor
                de los
                profesionales de la salud y el bienestar de los pacientes.
              </p>
            </div>
          </div>

          <!-- Visión -->
          <div class="col-lg-6 col-12">
            <div class="p-4 rounded-4 shadow bg-light text-dark min-h-100 infoMV">
              <h3 class="mb-3 d-flex align-items-center">
                <i class="material-icons me-2 color-warning">monitor_heart</i> Visión
              </h3>
              <p class="mb-0">
                Ser una empresa líder en el sector biomédico a nivel nacional, reconocida por su excelencia en servicio
                técnico, innovación en productos y compromiso con la seguridad y eficiencia del entorno hospitalario.
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  </section>
</template>

<style scoped>
.infoMV {
  border-radius: 10px;
  min-height: 250px;
  width: 100%;
}
</style>
