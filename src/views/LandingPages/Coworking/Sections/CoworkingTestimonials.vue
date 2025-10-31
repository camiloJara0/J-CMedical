<script setup></script>
<template>
  <section class="py-4 position-relative">
    <div class="container-fluid mt-8 mt-sm-2">
      <div class="row">
        <div class="col-10 mx-auto bg-gradient-dark border-radius-lg">
          <div class="row py-5">
            <div class="col-xl-4 col-md-6 px-5 position-relative">
              <img class="img border-radius-md img-custom position-relative z-index-2 mt-n7"
                src="src/assets/img/products/banner-medico-con-medico-usando-equipo.jpg"
                loading="lazy" alt="Medico" />
            </div>
            <div class="col-xl-4 col-md-5 z-index-2 position-relative px-md-3 px-5 my-md-auto mt-4">
              <i class="material-icons text-white text-5xl">nuestros clientes</i>
              <p class="text-lg text-white">
                Desde que comenzamos a trabajar con esta empresa, hemos notado una mejora significativa en la precisión
                y confiabilidad de nuestros equipos de monitoreo. Sus accesorios son duraderos, seguros y siempre llegan
                a tiempo. Una verdadera aliada en el cuidado de nuestros pacientes.
              </p>
              <p class="text-white font-weight-bold text-sm">
                Clientes -
                <span class="text-xs font-weight-normal">satisfechos</span>
              </p>
              <hr class="vertical start-100 ms-n5 d-xl-block d-none" />
            </div>
            <div class="col-1"></div>
            <div class="col-xl-2 col-12 px-xl-0 px-5 my-xl-auto">
              <h3 class="text-white mt-xl-0 mt-5">+ 100</h3>
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
  height: 500px;
  width: 300px;
  object-fit: cover;
}

@media (min-width: 768px) {
  .img-custom {
    max-width: 200px;
    height: 400px;
  }
}

/* Escritorio (≥1024px) */
@media (min-width: 1024px) {
  .img-custom {
    max-width: 500px;
    height: 500px;
  }
}


</style>
