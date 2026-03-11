<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../../../../stores'
import { traerProductos } from '../../../../core/Productos/GetProductos'
import { traerCategorias } from '../../../../core/Categorias/GetCategorias'
import { enviarProductos, reducirImagen } from '../../../../core/Productos/PostProductos'
import { eliminarProductos } from '../../../../core/Productos/DeleteProductos'
import PaginationComponent from '../Components/PaginationComponent.vue'

const productos = ref([])
const categorias = ref([])
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const loading = ref(false)
const store = useAppStore()

const formData = ref({
  id: null,
  nombre: '',
  descripcion: '',
  categoria_id: '',
  precio: '',
  stock: 0,
  imagen: ''
})

const selectedProducto = ref(null)
const searchTerm = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const productosFiltrados = computed(() => {
  currentPage.value = 1
  return productos.value.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const productosPaginados = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return productosFiltrados.value.slice(start, end)
})

onMounted(async () => {
    currentPage.value = 1
  await loadData()
})

async function loadData() {
  try {
    loading.value = true
    productos.value = await traerProductos()
    categorias.value = await traerCategorias()
    currentPage.value = 1
  } catch (error) {
    store.mostrarAlerta('Error al cargar productos', 'danger')
  } finally {
    loading.value = false
  }
}

function openCreateForm() {
  isEditing.value = false
  formData.value = {
    id: null,
    nombre: '',
    descripcion: '',
    categoria_id: '',
    precio: '',
    imagen: ''
  }
  showFormModal.value = true
}

function openEditForm(producto) {
  isEditing.value = true
  selectedProducto.value = producto
  formData.value = { ...producto }
  selectedProducto.value.imagen = ''
  formData.value.imagen = ''
  showFormModal.value = true
}

function openDeleteModal(producto) {
  selectedProducto.value = producto
  showDeleteModal.value = true
}

async function saveProducto() {
  if (!formData.value.nombre || !formData.value.categoria_id) {
    store.mostrarAlerta('Por favor completa los campos obligatorios', 'warning')
    return
  }

  try {
    loading.value = true
    const response = await enviarProductos(isEditing.value, formData.value)

    await loadData()
    showFormModal.value = false
    store.mostrarAlerta(isEditing.value ? 'Producto actualizado' : 'Producto creado', 'success')
  } catch (error) {
    store.mostrarAlerta('Error al guardar producto', 'danger')
  } finally {
    loading.value = false
  }
}

async function deleteProducto() {
  try {
    loading.value = true
    const response = await eliminarProductos(selectedProducto.value)

    await loadData()
    showDeleteModal.value = false
    store.mostrarAlerta('Producto eliminado', 'success')
  } catch (error) {
    store.mostrarAlerta('Error al eliminar producto', 'danger')
  } finally {
    loading.value = false
  }
}

function getCategoriaName(id) {
  const cat = categorias.value.find(c => c.id === id)
  return cat ? cat.nombre : 'N/A'
}

async function onFileChange(event) {
  const file = event.target.files[0]; // primer archivo seleccionado
  const imagen = await reducirImagen(file)

  formData.value.imagen = imagen;
}

</script>

<template>
  <section>
    <div class="container">
      <div class="row align-items-center mb-4">
        <div class="col-lg-6">
          <h3 class="mt-2">Gestionar Productos</h3>
        </div>
        <div class="col-lg-6 text-end">
          <button @click="openCreateForm" class="btn btn-dark btn-sm">
            <i class="material-icons fs-5 me-2">add</i> Nuevo Producto
          </button>
        </div>
      </div>

      <!-- Búsqueda -->
      <div class="row mb-4">
        <div class="col-lg-6">
          <input v-model="searchTerm" type="search" class="form-control border px-2" placeholder="Buscar producto..." />
        </div>
      </div>

      <!-- Tabla de Productos -->
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead class="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productosPaginados" :key="producto.id">
              <td class="fw-bold">{{ producto.nombre }}</td>
              <td>{{ producto.descripcion?.substring(0, 50) }}...</td>
              <td>{{ getCategoriaName(producto.categoria_id) }}</td>
              <td>${{ producto.precio }}</td>
              <td>
                <button @click="openEditForm(producto)" class="btn btn-sm btn-warning me-2" title="Editar">
                  <i class="material-icons" :style="{ fontSize: '12px' }">edit</i>
                </button>
                <button @click="openDeleteModal(producto)" class="btn btn-sm btn-danger" title="Eliminar">
                  <i class="material-icons" :style="{ fontSize: '12px' }">delete</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="productosFiltrados.length === 0" class="alert alert-info text-center">
          No hay productos que mostrar
        </div>

      </div>
      <!-- Paginación -->
      <PaginationComponent
        v-if="productosFiltrados.length > 0"
        :currentPage="currentPage"
        :totalItems="productosFiltrados.length"
        :itemsPerPage="itemsPerPage"
        @update:currentPage="currentPage = $event"
        @update:itemsPerPage="itemsPerPage = $event"
      />
    </div>
  </section>

  <!-- Modal Formulario -->
  <Teleport to="body">
    <div v-if="showFormModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="m-0">{{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}</h5>
          <button @click="showFormModal = false" class="btn-close">
            <i class="material-icons">close</i>
          </button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label fw-bold">Nombre *</label>
            <input v-model="formData.nombre" type="text" class="form-control" placeholder="Nombre del producto" />
          </div>

          <div class="mb-3">
            <label class="form-label fw-bold">Descripción</label>
            <textarea v-model="formData.descripcion" class="form-control" rows="3"
              placeholder="Descripción del producto"></textarea>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-bold">Categoría *</label>
              <select v-model="formData.categoria_id" class="form-select px-2">
                <option value="">Selecciona una categoría</option>
                <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
                  {{ cat.nombre }}
                </option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label fw-bold">Precio</label>
              <input v-model="formData.precio" type="number" step="0.01" class="form-control" placeholder="0.00" />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 input-grop mb-3">
              <label class="form-label fw-bold">URL Imagen</label>
              <input @change="onFileChange" type="file" class="form-control" placeholder="Selecciona una imagen" id="inputGroupFile" />
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label fw-bold">Stock</label>
              <input v-model="formData.stock" type="number" step="1" class="form-control" placeholder="0" />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="showFormModal = false" class="btn btn-secondary">
            Cancelar
          </button>
          <button @click="saveProducto" :disabled="loading" class="btn btn-dark">
            {{ loading ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Modal Confirmación Eliminar -->
  <Teleport to="body">
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content modal-sm">
        <div class="modal-header">
          <h5>Confirmar eliminación</h5>
        </div>
        <div class="modal-body">
          <p>¿Estás seguro de que deseas eliminar <strong>{{ selectedProducto?.nombre }}</strong>?</p>
          <p class="text-muted small">Esta acción no se puede deshacer.</p>
        </div>
        <div class="modal-footer">
          <button @click="showDeleteModal = false" class="btn btn-secondary">
            Cancelar
          </button>
          <button @click="deleteProducto" :disabled="loading" class="btn btn-danger">
            {{ loading ? 'Eliminando...' : 'Eliminar' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.modal-sm {
  max-width: 400px;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.btn-close:hover {
  color: #333;
}

.table-responsive {
  border-radius: 8px;
  overflow-y: hidden;
}

.table {
  margin-bottom: 0;
}

.table thead th {
  padding: 1rem;
  font-weight: 600;
  border: none;
}

.table tbody td {
  padding: 1rem;
  vertical-align: middle;
}

.btn-sm {
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
}

.btn-sm i {
  font-size: 1.1rem;
}
</style>
