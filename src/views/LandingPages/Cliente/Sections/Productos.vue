<script setup>
// example component
import SimpleBlogCard from "../../../../examples/cards/blogCards/SimpleBlogCard.vue";
import MaterialInput from "../../../../components/MaterialInput.vue";
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from "../../../../stores";
import { traerProductos } from "../../../../core/Productos/GetProductos";
import { traerCategorias } from "../../../../core/Categorias/GetCategorias";
import SkeletonProduct from "../Components/SkeletonProduct.vue";

const productos = ref([])
const categorias = ref([])
const categoriaSeleccionada = ref('')
const busqueda = ref('')
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  await llamaDatos()
})

async function llamaDatos() {
  try {
    loading.value = true
    error.value = null
    const [productosData, categoriasData] = await Promise.all([
      traerProductos(),
      traerCategorias()
    ])
    productos.value = productosData || []
    categorias.value = categoriasData || []
  } catch (err) {
    error.value = err.message || 'Error al cargar los datos. Por favor intenta nuevamente.'
    productos.value = []
    categorias.value = []
  } finally {
    loading.value = false
  }
}

const productosFiltrados = computed(() => {
  return productos.value.filter((p) => {
    const coincideCategoria = !categoriaSeleccionada.value || p.categoria_id === categoriaSeleccionada.value;
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.value.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });
})

const tarjetasPorFila = computed(() => {
  const filas = [];
  for (let i = 0; i < productosFiltrados.value.length; i += 3) {
    filas.push(productosFiltrados.value.slice(i, i + 3));
  }
  return filas;
})

const store = useAppStore()

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
</script>
<template>
  <section class="features-3 py-4">
    <div class="container">
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

      <!-- Barra de búsqueda -->
      <div class="row text-center justify-content-center my-5">
        <!-- Selección de categoría -->
        <div class="col-lg-4 col-md-6 mb-3">
          <label class="form-label fw-bold">Seleccionar categoría</label>
          <select v-model="categoriaSeleccionada" class="form-select px-2">
            <option value="">Todas</option>
            <option v-for="c in categorias" :key="c.id" :value="c.id">
              {{ c.nombre }}
            </option>
          </select>
        </div>

        <!-- Búsqueda de producto -->
        <div class="col-lg-4 col-md-6 mb-3">
          <label class="form-label fw-bold">Buscar producto</label>
          <input type="search" v-model="busqueda" class="form-control border px-2" placeholder="Ej. Cable ECG..." />
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
      <div v-if="!loading && !error && productosFiltrados.length === 0" class="row mt-5">
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
      <div v-if="!loading && !error && productosFiltrados.length > 0" class="row mt-5"
        v-for="(grupo, filaIndex) in tarjetasPorFila" :key="filaIndex">
        <div class="col-lg-4 mb-4" v-for="(tarjeta, colIndex) in grupo" :key="colIndex">
          <SimpleBlogCard :image="tarjeta.imagen" :title="tarjeta.nombre" :description="tarjeta.descripcion"
            :action="{ color: 'dark', action: abrirModal }" :producto="tarjeta" class="mb-4" />
        </div>
      </div>

      <!-- Modal Producto -->
      <!-- Modal Producto -->
      <Teleport to="body">
        <div class="fondo" v-if="store.showModal">
          <div class="modal-custom">
            <!-- Encabezado -->
            <div class="header-modal-custom">
              <h3>{{ store.informacion.nombre }}</h3>
              <button @click="cerrarModal()" type="button" class="close-button" aria-label="Close">
                <i class="material-icons">close</i>
              </button>
            </div>

            <!-- Imagen -->
            <div class="header-modal-body">
              <img :src="store.informacion.imagen" alt="Imagen del producto" loading="lazy">
            </div>

            <!-- Información -->
            <div class="modal-body-custom">
              <p><strong>Descripción:</strong> {{ store.informacion.descripcion }}</p>
              <p><strong>Estado:</strong> {{ store.informacion.estado }}</p>
              <p><strong>Stock disponible:</strong> {{ store.informacion.stock }}</p>
              <p><strong>Precio referencial:</strong>
                {{ store.informacion.precio_referencial ? store.informacion.precio_referencial : 'No disponible' }}
              </p>
              <p><strong>Marca:</strong> {{ store.informacion.marca ? store.informacion.marca : 'No especificada' }}</p>
              <p><strong>Modelo:</strong> {{ store.informacion.modelo ? store.informacion.modelo : 'No especificado' }}
              </p>
              <p><strong>Tipo de conector:</strong> {{ store.informacion.tipo_conector ? store.informacion.tipo_conector
                : 'No especificado' }}</p>
            </div>

            <!-- Footer fijo -->
            <div class="modal-footer-custom">
              <button class="btn-primary" @click="store.agregarProducto(store.informacion)">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </Teleport>


    </div>

  </section>
</template>

<style>
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
  backdrop-filter: blur(4px);
}

.modal-custom {
  background-color: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  position: relative;
}

.header-modal-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.header-modal-custom h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #222;
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

.header-modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: #fafafa;
}

.header-modal-body img {
  max-width: 100%;
  max-height: 40vh;
  object-fit: contain;
  border-radius: 8px;
}

.modal-body-custom {
  flex: 1;
  padding: 16px 20px;
  overflow-y: auto;
}

.modal-body-custom p {
  margin: 10px 0;
  font-size: 0.95rem;
  color: #444;
}

.modal-body-custom strong {
  color: #111;
}

.modal-footer-custom {
  position: sticky;
  bottom: 0;
  background: #fff;
  padding: 12px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease, background 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, #0056b3, #00408f);
}
</style>
