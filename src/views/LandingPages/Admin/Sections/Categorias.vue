<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../../../../stores'
import { traerCategorias } from '../../../../core/Categorias/GetCategorias'
import { enviarCategorias } from '../../../../core/Categorias/PostCategorias'

const categorias = ref([])
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const loading = ref(false)
const store = useAppStore()

const formData = ref({
    id: null,
    nombre: '',
    descripcion: ''
})

const selectedCategoria = ref(null)
const searchTerm = ref('')

const categoriasFiltradas = computed(() => {
    return categorias.value.filter(c =>
        c.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
})

onMounted(async () => {
    await loadData()
})

async function loadData() {
    try {
        loading.value = true
        categorias.value = await traerCategorias()
    } catch (error) {
        store.alert = { color: 'danger', texto: 'Error al cargar categorías' }
        store.showAlert = true
    } finally {
        loading.value = false
    }
}

function openCreateForm() {
    isEditing.value = false
    formData.value = {
        id: null,
        nombre: '',
        descripcion: ''
    }
    showFormModal.value = true
}

function openEditForm(categoria) {
    isEditing.value = true
    selectedCategoria.value = categoria
    formData.value = { ...categoria }
    showFormModal.value = true
}

function openDeleteModal(categoria) {
    selectedCategoria.value = categoria
    showDeleteModal.value = true
}

async function saveCategoria() {
    if (!formData.value.nombre) {
        store.alert = { color: 'warning', texto: 'Por favor ingresa el nombre de la categoría' }
        store.showAlert = true
        return
    }

    try {
        loading.value = true

        const response = await enviarCategorias(isEditing.value, formData.value)

        await loadData()
        showFormModal.value = false
        store.alert = { color: 'success', texto: isEditing.value ? 'Categoría actualizada' : 'Categoría creada' }
        store.showAlert = true
    } catch (error) {
        store.alert = { color: 'danger', texto: 'Error al guardar categoría' }
        store.showAlert = true
    } finally {
        loading.value = false
    }
}

async function deleteCategoria() {
    try {
        loading.value = true
        const response = await fetch(`http://127.0.0.1:8000/api/categorias/${selectedCategoria.value.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) throw new Error('Error al eliminar')

        await loadData()
        showDeleteModal.value = false
        store.alert = { color: 'success', texto: 'Categoría eliminada' }
        store.showAlert = true
    } catch (error) {
        store.alert = { color: 'danger', texto: 'Error al eliminar categoría' }
        store.showAlert = true
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <section>
        <div class="container">
            <div class="row align-items-center mb-4">
                <div class="col-lg-6">
                    <h3 class="mt-2">Gestionar Categorías</h3>
                </div>
                <div class="col-lg-6 text-end">
                    <button @click="openCreateForm" class="btn btn-dark btn-sm">
                        <i class="material-icons me-2">add</i> Nueva Categoría
                    </button>
                </div>
            </div>

            <!-- Búsqueda -->
            <div class="row mb-4">
                <div class="col-lg-6">
                    <input v-model="searchTerm" type="search" class="form-control" placeholder="Buscar categoría..." />
                </div>
            </div>

            <!-- Tabla de Categorías -->
            <div class="table-responsive">
                <table class="table table-striped align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="categoria in categoriasFiltradas" :key="categoria.id">
                            <td class="fw-bold">{{ categoria.nombre }}</td>
                            <td>{{ categoria.descripcion || 'Sin descripción' }}</td>
                            <td>
                                <button @click="openEditForm(categoria)" class="btn btn-sm btn-warning me-2"
                                    title="Editar">
                                    <i class="material-icons">edit</i>
                                </button>
                                <button @click="openDeleteModal(categoria)" class="btn btn-sm btn-danger"
                                    title="Eliminar">
                                    <i class="material-icons">delete</i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="categoriasFiltradas.length === 0" class="alert alert-info text-center">
                    No hay categorías que mostrar
                </div>
            </div>
        </div>
    </section>

    <!-- Modal Formulario -->
    <Teleport to="body">
        <div v-if="showFormModal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>{{ isEditing ? 'Editar Categoría' : 'Nueva Categoría' }}</h5>
                    <button @click="showFormModal = false" class="btn-close"></button>
                </div>

                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Nombre *</label>
                        <input v-model="formData.nombre" type="text" class="form-control"
                            placeholder="Nombre de la categoría" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold">Descripción</label>
                        <textarea v-model="formData.descripcion" class="form-control" rows="3"
                            placeholder="Descripción de la categoría"></textarea>
                    </div>
                </div>

                <div class="modal-footer">
                    <button @click="showFormModal = false" class="btn btn-secondary">
                        Cancelar
                    </button>
                    <button @click="saveCategoria" :disabled="loading" class="btn btn-dark">
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
                    <p>¿Estás seguro de que deseas eliminar <strong>{{ selectedCategoria?.nombre }}</strong>?</p>
                    <p class="text-muted small">Esta acción no se puede deshacer.</p>
                </div>
                <div class="modal-footer">
                    <button @click="showDeleteModal = false" class="btn btn-secondary">
                        Cancelar
                    </button>
                    <button @click="deleteCategoria" :disabled="loading" class="btn btn-danger">
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
    overflow: hidden;
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
