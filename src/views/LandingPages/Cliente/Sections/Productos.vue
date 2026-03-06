<script setup>
// example component
import SimpleBlogCard from "../../../../examples/cards/blogCards/SimpleBlogCard.vue";
import MaterialInput from "../../../../components/MaterialInput.vue";
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from "../../../../stores";
import { traerProductos } from "../../../../core/Productos/GetProductos";
import { traerCategorias } from "../../../../core/Categorias/GetCategorias";

const productos = ref([])
const categorias = ref([])
const categoriaSeleccionada = ref('')
const busqueda = ref('')

onMounted(async () => {
  productos.value = await traerProductos()
  categorias.value = await traerCategorias()
})

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

function abrirModal(title) {
  store.showModal = true
  const item = tarjetas.find((p) => p.title === title)
  store.informacion = item
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
          <input type="search" v-model="busqueda" class="form-control px-2" placeholder="Ej. Cable ECG..." />
        </div>
      </div>


      <div class="row mt-5" v-for="(grupo, filaIndex) in tarjetasPorFila" :key="filaIndex">
        <div class="col-lg-4 mb-4" v-for="(tarjeta, colIndex) in grupo" :key="colIndex">
          <SimpleBlogCard :image="tarjeta.imagen" :title="tarjeta.nombre" :description="tarjeta.descripcion"
            :action="{ color: 'dark', action: abrirModal }" :producto="tarjeta" class="mb-4" />
        </div>
      </div>

    </div>

  </section>
</template>
