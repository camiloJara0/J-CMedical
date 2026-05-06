<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";

//example components
import NavbarDefault from "./Components/NavbarDefault.vue";
import DefaultFooter from "./Components/FooterDefault.vue";
import Header from "./Components/Header.vue";
import MaterialAlert from "./Components/MaterialAlert.vue";

//sections
import Information from "./Sections/Information.vue";
import Testimonials from "./Sections/Testimonials.vue";
import AboutUs from "./Sections/AboutUs.vue";
import Productos from "./Sections/Productos.vue";
import { useAppStore } from "../../../stores";
import ContactView from "./Components/ContactView.vue";
import { traerProductos } from "../../../core/Productos/GetProductos";
import { traerCategorias } from "../../../core/Categorias/GetCategorias";
import { useProductosStore } from "../../../stores/productos";
import { storeToRefs } from 'pinia'

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

const productosStore = useProductosStore()

const { productos, categorias, productosFiltrados, busqueda, categoriaSeleccionada } = storeToRefs(productosStore)

const { llamaDatos, seleccionarCategoria } = productosStore

onMounted(async () => {
  await llamaDatos()
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

const productosPorCategoria = (categoriaId) => {
  return productos.value.filter(p => p.categoria_id === categoriaId)
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

  <div id="Inicio" class="products blur shadow-blur mx-3 mx-md-4 mt-n4 mb-4">
    <button class="btn btn-dark d-lg-none d-flex align-items-center gap-2" data-bs-toggle="collapse" data-bs-target="#filtrosCollapse">
      <span class="material-icons">menu</span>Filtros
    </button>
    <div class="asideProducts collapse d-lg-block" id="filtrosCollapse">
      <aside  class=" p-3 border rounded shadow-sm">
        <!-- Buscar producto -->
        <div class="mb-4">
          <h6 class="fw-bold color-default">Buscar Producto</h6>
          <input type="search" v-model="busqueda" class="form-control border px-2 mt-2" placeholder="Ej. Cable ECG..." />
        </div>
  
        <!-- Categorías con desplegables -->
        <div>
          <h6 class="fw-bold color-default">Categorías</h6>
          <div class="accordion" id="accordionCategorias">
            <div v-for="categoria in categorias" :key="categoria.id" class="accordion-item">
              <p class="accordion-header" :id="`heading-${categoria.id}`">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" @click="seleccionarCategoria(categoria.id)"
                  :data-bs-target="`#collapse-${categoria.id}`" aria-expanded="false"
                  :aria-controls="`collapse-${categoria.id}`">
                  {{ categoria.nombre }}
                </button>
              </p>
              <div :id="`collapse-${categoria.id}`" class="accordion-collapse collapse"
                :aria-labelledby="`heading-${categoria.id}`" data-bs-parent="#accordionCategorias">
                <div class="accordion-body">
                  <ul class="list-unstyled ps-2">
                    <li v-for="producto in productosPorCategoria(categoria.id)" :key="producto.id" @click="abrirModal(producto)"
                      class="text-muted small mb-1 hoverable-item">
                      • {{ producto.nombre }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <Productos id="Productos" />

  </div>

  <DefaultFooter />

  <!-- Alerta -->
  <div class="fondoAlert" v-if="store.showAlert">
    <MaterialAlert :dismissible="true" :color="store.alert.color" fontWeight="bold" class="m-3 mr-5">
      <p class="font-weight-bold m-0">{{ store.alert.texto }}</p>
    </MaterialAlert>
  </div>


<teleport to="body" v-if="store.carrito.length">
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1050;">
    <a href="/#Contactanos"
      class="btn btn-lg btn-dark rounded-pill shadow-lg d-flex align-items-center gap-2 animate__animated animate__pulse">
      <span class="material-icons">shopping_cart</span>
      Solicitar Cotización
    </a>
  </div>
</teleport>
</template>

<style scoped>
.products {
  padding-top: 8rem;
  display: flex;
  justify-content: space-between;
}

.asideProducts {
  width: 25%;
  height: fit-content;
  padding: 2rem;
  margin: 1rem 1rem 1rem 1.5rem;
}

.accordion-button {
  transition: background-color 0.3s ease, transform 0.2s ease;
  padding: 5px 1rem;
}

.accordion-button:hover {
  background-color: #eef2ff;
  transform: scale(1.02);
}

.hoverable-item {
  transition: color 0.2s ease, transform 0.2s ease;
  cursor: pointer;
}

.hoverable-item:hover {
  color: #0d6efd;
  transform: translateX(3px);
}

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
  color: white;
  background-color: #0000ff;
  text-transform: uppercase;
  font-size: small;
  font-weight: bold;
}

.container-custom {
  /* background: linear-gradient(180deg,rgba(244, 244, 244, 1) 3%, rgba(34, 98, 163, 1) 40%, rgba(235, 237, 240, 1) 100%); */
  background: #FFFFFF;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 59%, rgba(237, 239, 242, 1) 91%);
  height: 160vh;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
  overflow-x: hidden;
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

.fondoAlert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 105099999999;
  display: flex;
  justify-content: end;
  align-items: start;
  overflow-y: none;
}

.container-contacto {
  display: flex;

}

@media (max-width: 992px) {
  .products {
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
  }

  .asideProducts {
    width: 100%;
    margin: 1rem 0;
    position: static;
    left: 0;
    right: 0;
    z-index: 9999999;
    bottom: 0;
  }
}
</style>
