<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../../../../stores'

const usuarios = ref([])
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const loading = ref(false)
const store = useAppStore()

const formData = ref({
  id: null,
  nombre: '',
  email: '',
  password: '',
  rol: 'cliente'
})

const selectedUsuario = ref(null)
const searchTerm = ref('')

const usuariosFiltrados = computed(() => {
  return usuarios.value.filter(u =>
    u.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

onMounted(async () => {
  await loadData()
})

async function loadData() {
  try {
    loading.value = true
    const response = await fetch('http://127.0.0.1:8000/api/usuarios', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    if (!response.ok) throw new Error('Error al cargar')

    usuarios.value = await response.json()
  } catch (error) {
    store.alert = { color: 'danger', texto: 'Error al cargar usuarios' }
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
    email: '',
    password: '',
    rol: 'cliente'
  }
  showFormModal.value = true
}

function openEditForm(usuario) {
  isEditing.value = true
  selectedUsuario.value = usuario
  formData.value = {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    password: '',
    rol: usuario.rol || 'cliente'
  }
  showFormModal.value = true
}

function openDeleteModal(usuario) {
  selectedUsuario.value = usuario
  showDeleteModal.value = true
}

async function saveUsuario() {
  if (!formData.value.nombre || !formData.value.email) {
    store.alert = { color: 'warning', texto: 'Por favor completa los campos obligatorios' }
    store.showAlert = true
    return
  }

  if (!isEditing.value && !formData.value.password) {
    store.alert = { color: 'warning', texto: 'La contraseña es requerida para nuevos usuarios' }
    store.showAlert = true
    return
  }

  try {
    loading.value = true
    const method = isEditing.value ? 'PUT' : 'POST'
    const url = isEditing.value ?
      `http://127.0.0.1:8000/api/usuarios/${formData.value.id}` :
      `http://127.0.0.1:8000/api/usuarios`

    const data = { ...formData.value }
    if (isEditing.value && !data.password) {
      delete data.password
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error('Error al guardar')

    await loadData()
    showFormModal.value = false
    store.alert = { color: 'success', texto: isEditing.value ? 'Usuario actualizado' : 'Usuario creado' }
    store.showAlert = true
  } catch (error) {
    store.alert = { color: 'danger', texto: 'Error al guardar usuario' }
    store.showAlert = true
  } finally {
    loading.value = false
  }
}

async function deleteUsuario() {
  try {
    loading.value = true
    const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${selectedUsuario.value.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    if (!response.ok) throw new Error('Error al eliminar')

    await loadData()
    showDeleteModal.value = false
    store.alert = { color: 'success', texto: 'Usuario eliminado' }
    store.showAlert = true
  } catch (error) {
    store.alert = { color: 'danger', texto: 'Error al eliminar usuario' }
    store.showAlert = true
  } finally {
    loading.value = false
  }
}

function getRolBadge(rol) {
  const rolMap = {
    'admin': 'danger',
    'cliente': 'primary',
    'vendedor': 'success'
  }
  return rolMap[rol] || 'secondary'
}
</script>

<template>
  <section>
    <div class="container">
      <div class="row align-items-center mb-4">
        <div class="col-lg-6">
          <h3 class="mt-2">Gestionar Usuarios</h3>
        </div>
        <div class="col-lg-6 text-end">
          <button @click="openCreateForm" class="btn btn-dark btn-sm">
            <i class="material-icons me-2">add</i> Nuevo Usuario
          </button>
        </div>
      </div>

      <!-- Búsqueda -->
      <div class="row mb-4">
        <div class="col-lg-6">
          <input
            v-model="searchTerm"
            type="search"
            class="form-control"
            placeholder="Buscar por nombre o email..."
          />
        </div>
      </div>

      <!-- Tabla de Usuarios -->
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead class="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuariosFiltrados" :key="usuario.id">
              <td class="fw-bold">{{ usuario.nombre }}</td>
              <td>{{ usuario.email }}</td>
              <td>
                <span class="badge" :class="`bg-${getRolBadge(usuario.rol)}`">
                  {{ usuario.rol }}
                </span>
              </td>
              <td>
                <button
                  @click="openEditForm(usuario)"
                  class="btn btn-sm btn-warning me-2"
                  title="Editar"
                >
                  <i class="material-icons">edit</i>
                </button>
                <button
                  @click="openDeleteModal(usuario)"
                  class="btn btn-sm btn-danger"
                  title="Eliminar"
                >
                  <i class="material-icons">delete</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="usuariosFiltrados.length === 0" class="alert alert-info text-center">
          No hay usuarios que mostrar
        </div>
      </div>
    </div>
  </section>

  <!-- Modal Formulario -->
  <div v-if="showFormModal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5>{{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}</h5>
        <button @click="showFormModal = false" class="btn-close"></button>
      </div>

      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label fw-bold">Nombre *</label>
          <input
            v-model="formData.nombre"
            type="text"
            class="form-control"
            placeholder="Nombre del usuario"
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Email *</label>
          <input
            v-model="formData.email"
            type="email"
            class="form-control"
            placeholder="email@ejemplo.com"
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">{{ isEditing ? 'Nueva Contraseña (opcional)' : 'Contraseña *' }}</label>
          <input
            v-model="formData.password"
            type="password"
            class="form-control"
            :placeholder="isEditing ? 'Dejar vacío para no cambiar' : 'Contraseña'"
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Rol</label>
          <select v-model="formData.rol" class="form-select">
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="showFormModal = false" class="btn btn-secondary">
          Cancelar
        </button>
        <button @click="saveUsuario" :disabled="loading" class="btn btn-dark">
          {{ loading ? 'Guardando...' : 'Guardar' }}
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Confirmación Eliminar -->
  <div v-if="showDeleteModal" class="modal-overlay">
    <div class="modal-content modal-sm">
      <div class="modal-header">
        <h5>Confirmar eliminación</h5>
      </div>
      <div class="modal-body">
        <p>¿Estás seguro de que deseas eliminar a <strong>{{ selectedUsuario?.nombre }}</strong>?</p>
        <p class="text-muted small">Esta acción no se puede deshacer.</p>
      </div>
      <div class="modal-footer">
        <button @click="showDeleteModal = false" class="btn btn-secondary">
          Cancelar
        </button>
        <button @click="deleteUsuario" :disabled="loading" class="btn btn-danger">
          {{ loading ? 'Eliminando...' : 'Eliminar' }}
        </button>
      </div>
    </div>
  </div>
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

.badge {
  padding: 0.35rem 0.65rem;
}
</style>
