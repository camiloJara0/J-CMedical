<script setup>
// example component
import SimpleBlogCard from "../../../../examples/cards/blogCards/SimpleBlogCard.vue";
import MaterialInput from "../../../../components/MaterialInput.vue";
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from "../../../../stores";
import { traerProductos } from "../../../../core/Productos/GetProductos";
import { traerCategorias } from "../../../../core/Categorias/GetCategorias";
import SkeletonProduct from "../Components/SkeletonProduct.vue";
import { useProductosStore } from "../../../../stores/productos";
import { storeToRefs } from 'pinia'

const store = useAppStore()
const storeProductos = useProductosStore()

const { productos } = storeToRefs(storeProductos)
onMounted(async () => {
  await storeProductos.llamaDatos()
})

const productosCortados = computed(() => {
  return productos.value.slice(0, 5)
})
</script>
<template>
  <section class="features-3 py-4">
    <div class="container my-5">
      <div class="row text-center justify-content-center">
        <div class="col-lg-6">
          <h2>Explora nuestros productos</h2>
          <p>
            Contamos con una línea especializada de accesorios compatibles con equipos de monitoreo clínico,
            seleccionados cuidadosamente para garantizar rendimiento, durabilidad y seguridad. Nuestros productos
            incluyen:
          </p>
        </div>
      </div>

      <!-- Carrusel -->
      <div id="catalogoCarousel" class="carousel slide" data-bs-ride="carousel">
        <!-- Indicadores -->
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#catalogoCarousel" data-bs-slide-to="0" class="active"></button>
          <button type="button" data-bs-target="#catalogoCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#catalogoCarousel" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#catalogoCarousel" data-bs-slide-to="3"></button>
          <button type="button" data-bs-target="#catalogoCarousel" data-bs-slide-to="4"></button>
        </div>

        <!-- Items -->
        <div class="carousel-inner">
          <div v-for="(producto, index) in productosCortados" :key="producto.id" class="carousel-item"
            :class="{ active: index === 0 }">

            <a href="/Catalogo" class="d-flex flex-column align-items-center catalogo">
              <img :src="producto.imagen" :alt="producto.title" class="d-block w-75 rounded shadow" loading="lazy" @error="e => e.target.src = 'src/assets/img/errorImagen.jpg'" />
              <div class="mt-3">
                <h5>{{ producto.title }}</h5>
                <p class="text-muted">{{ producto.descripcion }}</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Controles -->
        <button class="carousel-control-prev text-dark" type="button" data-bs-target="#catalogoCarousel"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next text-dark" type="button" data-bs-target="#catalogoCarousel"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

  </section>
</template>

<style>
.catalogo img {
  width: auto;
  height: 60vh;
  object-fit: cover;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-image: none; /* quitamos el ícono por defecto */
}

.carousel-control-prev-icon::after {
  content: '<'; /* flecha izquierda */
  font-size: 2rem;
  color: #343a40; /* gris oscuro */
}

.carousel-control-next-icon::after {
  content: '>'; /* flecha derecha */
  font-size: 2rem;
  color: #343a40; /* gris oscuro */
}

@media (max-width: 768px) {
  .catalogo img {
    height: 40vh;
  }
}
</style>
