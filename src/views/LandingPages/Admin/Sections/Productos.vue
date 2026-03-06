<script setup>
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
          <h3 class="mt-2">Productos</h3>
        </div>
      </div>

      <div class="p-md-5 mt-md-3 mt-2">
        <div class="row g-4 align-items-start">
          <!-- Crear -->
          <div class="col-lg-3 col-12">
            <div class="p-4 rounded-6 shadow text-white min-h-100 infoMV bg-custom-oscuro">
              <h5 class="d-flex align-items-center text-white">
                <i class="material-icons me-2 color-warning">monitor_heart</i> Crear Producto
              </h5>
            </div>
          </div>

          <!-- Visión -->
          <div class="col-lg-3 col-12">
            <div class="p-4 rounded-4 shadow bg-light text-dark min-h-100 infoMV">
              <h5 class="d-flex align-items-center">
                <i class="material-icons me-2 color-warning">monitor_heart</i> Actualizar Producto
              </h5>
            </div>
          </div>

          <!-- Crear -->
          <div class="col-lg-3 col-12">
            <div class="p-4 rounded-6 shadow text-white min-h-100 infoMV bg-custom-oscuro">
              <h5 class="d-flex align-items-center text-white">
                <i class="material-icons me-2 color-warning">monitor_heart</i> Eliminar Producto
              </h5>
            </div>
          </div>

          <!-- Visión -->
          <div class="col-lg-3 col-12">
            <div class="p-4 rounded-4 shadow bg-light text-dark min-h-100 infoMV">
              <h5 class="d-flex align-items-center">
                <i class="material-icons me-2 color-warning">monitor_heart</i> Ver Producto
              </h5>
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
  min-height: 100px;
  width: 100%;
}
</style>
