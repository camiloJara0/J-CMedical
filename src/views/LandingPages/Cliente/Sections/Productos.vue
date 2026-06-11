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

const productosStore = useProductosStore()

const { productos, categorias, productosFiltrados, loading, error, busqueda, categoriaSeleccionada, orden } = storeToRefs(productosStore)

const { llamaDatos, borrarFiltros, ordenar } = productosStore

onMounted(async () => {
  await llamaDatos()
})

const store = useAppStore()
const grid = ref(false)

function abrirModal(producto) {
  store.showModal = true
  const item = productos.value.find((p) => p.id === producto.id)
  store.informacion = item
}

async function recargar() {
  await llamaDatos()
}

function cerrarModal() {
  store.showModal = false
}

function cambiarColumnas() {
  // Lógica para cambiar el número de columnas (ejemplo: alternar entre 3 y 4 columnas)
  console.log("Cambiando columnas")
  grid.value = !grid.value
}
</script>
<template>
  <section class="features-3 py-4" style="width: 100%;">
    <div class="container">

      <!-- Barra de búsqueda -->
      <div class="row text-center justify-content-end my-2">

        <!-- Búsqueda de producto -->
        <div class="col-lg-4 col-md-6 mb-3 d-flex align-items-center justify-content-end gap-2">
          <button v-if="categoriaSeleccionada || busqueda || orden === 'desc'"
            class="btn d-flex align-items-center gap-1" @click="borrarFiltros">
            <span class="material-icons">filter_list</span>
            Limpiar
          </button>

          <button class="btn d-flex align-items-center gap-1" @click="ordenar">
            <span class="material-icons">sort_by_alpha</span>
            Ordenar
          </button>

          <button class="btn d-flex align-items-center gap-1" @click="cambiarColumnas">
            <span class="material-icons">view_column</span>
            Cambiar
          </button>
        </div>
      </div>

      <!-- Estado: Cargando -->
      <div v-if="loading" class="row mt-5">
        <div class="col-lg-4 mb-4" v-for="n in 3" :key="n">
          <SkeletonProduct class="mb-4" />
        </div>
      </div>

      <!-- Estado: Error -->
      <div v-if="error && !loading" class="row mt-5">
        <div class="col-lg-8 mx-auto">
          <div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-3" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path
                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            <div>
              <strong>Error al cargar productos</strong>
              <p class="mb-0">{{ error }}</p>
            </div>
          </div>
          <button @click="recargar" class="btn btn-dark mt-3">
            <i class="fa fa-refresh me-2"></i>Reintentar
          </button>
        </div>
      </div>

      <!-- Estado: Sin productos (sin resultados por filtro o no hay datos) -->
      <div v-if="!loading && !error && productosStore.productosFiltrados.length === 0" class="row mt-5">
        <div class="col-lg-8 mx-auto text-center">
          <div class="mb-4">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" class="mb-4 opacity-75">
              <circle cx="60" cy="60" r="55" stroke="currentColor" stroke-width="2" opacity="0.2" />
              <path d="M60 40V80M40 60H80" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                opacity="0.4" />
            </svg>
          </div>
          <h4 class="mb-3">No hay productos disponibles</h4>
          <p class="text-muted mb-4">
            <span v-if="productos.length > 0 && (categoriaSeleccionada || busqueda)">
              No encontramos productos que coincidan con tu búsqueda o categoría seleccionada.
            </span>
            <span v-else>
              No hay productos disponibles en este momento.
            </span>
          </p>
          <button v-if="(categoriaSeleccionada || busqueda)" @click="categoriaSeleccionada = ''; busqueda = ''"
            class="btn btn-dark">
            <i class="fa fa-times me-2"></i>Limpiar filtros
          </button>
        </div>
      </div>

      <!-- Estado: Mostrar productos -->
      <div v-if="!loading && !error && productosStore.productosFiltrados.length > 0"
        class="contenedorTarjetas row mt-5">
        <div class="mb-4" :class="{ 'col-xl-3 col-lg-4 col-md-6': grid, 'col-xl-4 col-lg-6 col-md-6': !grid }"
          v-for="(tarjeta, colIndex) in productosFiltrados" :key="colIndex">
          <SimpleBlogCard :image="tarjeta.imagen" :title="tarjeta.nombre" :description="tarjeta.descripcion"
            :action="{ color: 'dark', action: abrirModal }" :producto="tarjeta" class="mb-4" />
        </div>
      </div>


      <!-- Modal Producto Mejorado -->
      <Teleport to="body">
        <div v-if="store.showModal" class="ux-backdrop d-flex align-items-center justify-content-center">

          <div class="ux-modal container-fluid p-0">

            <!-- HEADER -->
            <div class="ux-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
              <h5 class="m-0 fw-semibold text-truncate">
                {{ store.informacion.nombre }}
              </h5>

              <button @click="cerrarModal()" class="ux-close-btn">
                <i class="material-icons">close</i>
              </button>
            </div>

            <!-- BODY -->
            <div class="row g-0 ux-body">

              <!-- GALERÍA -->
              <div class="col-md-6 ux-gallery p-4">
                <div class="ux-img-wrapper">
                  <img :src="store.informacion.imagen" class="img-fluid ux-main-img" alt="producto">
                </div>
              </div>

              <!-- INFO + COMPRA -->
              <div class="col-md-6 ux-info p-4 d-flex flex-column">

                <!-- PRECIO + ESTADO -->
                <div class="mb-3 d-flex align-items-center gap-3">
                  <span class="ux-price">
                    {{ store.informacion.precio_referencial || '—' }}
                  </span>

                  <span class="badge ms-2" :class="store.informacion.stock > 0 ? 'bg-success' : 'bg-danger'">
                    {{ store.informacion.stock > 0 ? 'Disponible' : 'Sin stock' }}
                  </span>
                </div>

                <!-- DESCRIPCIÓN -->
                <p class="ux-description">
                  {{ store.informacion.descripcion }}
                </p>

                <!-- ATRIBUTOS -->
                <div class="ux-attributes mb-3">
                  <div><strong>Marca:</strong> {{ store.informacion.marca || '—' }}</div>
                  <div><strong>Modelo:</strong> {{ store.informacion.modelo || '—' }}</div>
                  <div><strong>Conector:</strong> {{ store.informacion.tipo_conector || '—' }}</div>
                </div>

                <!-- ACCIONES (zona crítica UX) -->
                <div class="mt-auto">
                  <div class="d-grid gap-2">
                    <button class="btn btn-dark ux-btn-main" @click="store.agregarProducto(store.informacion)">
                      Añadir a cotizacion
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <!-- CARACTERÍSTICAS -->
            <div class="ux-extra border-top p-4 px-8">
              <h6 class="fw-semibold mb-3">Características</h6>

              <ul class="ux-features-list">
                <li><strong>Marca:</strong> {{ store.informacion.marca || '—' }}</li>
                <li><strong>Modelo:</strong> {{ store.informacion.modelo || '—' }}</li>
                <li><strong>Conector:</strong> {{ store.informacion.tipo_conector || '—' }}</li>
                <li><strong>Compatibilidad:</strong> {{ store.informacion.compatibilidad || '—' }}</li>
              </ul>
            </div>

          </div>
        </div>
      </Teleport>


    </div>

  </section>
</template>

<style>
.contenedorTarjetas {
  display: grid;
}

.contenedor3 {
  grid-template-columns: repeat(3, 1fr);
}

.contenedor4 {
  grid-template-columns: repeat(4, 1fr);
}

.ux-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 1050;
}

/* Contenedor modal */
.ux-modal {
  background: #fff;
  width: 95%;
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 16px;
  overflow: auto;
  animation: scaleIn 0.25s ease;
}

/* Header */
.ux-header {
  background: #fff;
}

.ux-body {
  flex: 1;
  overflow-y: auto;
}

/* Botón cerrar */
.ux-close-btn {
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}

/* Imagen */
.ux-img-wrapper {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.ux-main-img {
  max-height: 320px;
  object-fit: contain;
}

/* Precio */
.ux-price {
  font-size: 28px;
  font-weight: 700;
  color: #111;
}

/* Descripción */
.ux-description {
  color: #555;
  font-size: 14px;
  line-height: 1.5;
}

/* Lista atributos */
.ux-attributes div {
  font-size: 14px;
  margin-bottom: 4px;
}

/* Botones */
.ux-btn-main {
  padding: 12px;
  font-weight: 600;
}

.ux-btn-alt {
  padding: 10px;
}

/* Características */
.ux-features-list {
  columns: 2;
  padding-left: 18px;
}

.ux-features-list li {
  margin-bottom: 6px;
  font-size: 14px;
}

/* Animación */
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.fondo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
}

.modal-custom {
  background: #fff;
  width: 80vw;
  max-height: 80%;
  border-radius: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.header-modal-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.modal-content {
  display: flex;
  padding: 1rem;
}

.modal-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal-info {
  flex: 1;
  padding: 0 1rem;
}

.precio {
  font-size: 1.2rem;
  color: #e63946;
  font-weight: bold;
}

.acciones {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background: #007bff;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-extra {
  padding: 1rem;
  border-top: 1px solid #ddd;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  color: #555;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #ff4d4d;
}
</style>
