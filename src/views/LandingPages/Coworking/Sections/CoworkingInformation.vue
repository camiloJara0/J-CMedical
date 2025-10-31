<script setup>
// example component
import SimpleInfoCard from "../../../../examples/cards/infoCards/SimpleInfoCard.vue";
</script>
<template>
  <section class="py-md-7">
    <div class="container">
      <div class="row justify-content-start">
        <div class="col-md-4 ms-md-auto me-md-4">
          <SimpleInfoCard
            icon="payment"
            title="Pensamiento"
            description="En un mundo donde la precisión y la seguridad son esenciales, ofrecemos soluciones en monitoreo médico que combinan innovación, calidad y confianza."
          />
          <SimpleInfoCard
            class="mt-6"
            icon="insights"
            title="Ofrecemos"
            description="Nuestro catálogo de accesorios está diseñado para brindar soporte a profesionales de la salud en su labor diaria."
          />
        </div>
        <div class="col-md-4 me-md-auto ms-md-4">
          <SimpleInfoCard
            icon="access_alarms"
            title="Objetivo"
            description="Descubre cómo nuestros productos pueden ayudarte a elevar los estándares de atención médica."
          />
          <SimpleInfoCard
            class="mt-6"
            icon="sentiment_satisfied"
            title="Resultados"
            description="Con nuestros productos aseguramos un monitoreo eficiente, seguro y continuo de los pacientes."
          />
        </div>
      </div>
    </div>
  </section>
</template>
