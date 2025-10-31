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
          <h5>Comprometidos con la innovación y la seguridad clínica</h5>
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
          <a @click="showInfo()" class="color-default text-sm icon-move-right cursor-pointer">
            <span v-if="!show">Conoce Mas...</span>
            <span v-if="show">Mostar Menos...</span>
          </a>
        </div>
        <div class="col-lg-6 mt-lg-0 mt-5 ps-lg-0 ps-0 ms-auto">
          <AboutUsOption icon="mediation" content="Siempre estamos explorando nuevas tecnologías para mejorar nuestros productos." />
          <AboutUsOption icon="settings_overscan" content="Todos nuestros accesorios cumplen con normativas internacionales de seguridad médica." />

          <AboutUsOption icon="token" content="Brindamos asesoría directa para encontrar la solución ideal según tus necesidades clínicas." />
        </div>
      </div>
    </div>
  </section>
</template>
