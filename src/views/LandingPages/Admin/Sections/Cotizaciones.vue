<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../../../../stores'

const cotizaciones = ref([])
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const loading = ref(false)
const store = useAppStore()

const formData = ref({
    id: null,
    estado: '',
    respuesta: '',
    monto: ''
})

const selectedCotizacion = ref(null)
const statusFilter = ref('todas')

const cotizacionesFiltradas = computed(() => {
    if (statusFilter.value === 'todas') {
        return cotizaciones.value
    }
    return cotizaciones.value.filter(c => c.estado === statusFilter.value)
})

onMounted(async () => {
    await loadData()
})

async function loadData() {
    try {
        loading.value = true
        const response = await fetch('http://127.0.0.1:8000/api/solicitud_cotizacion', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Error al cargar')

        cotizaciones.value = await response.json()
    } catch (error) {
        store.alert = { color: 'danger', texto: 'Error al cargar cotizaciones' }
        store.showAlert = true
    } finally {
        loading.value = false
    }
}

function openRespondForm(cotizacion) {
    isEditing.value = true
    selectedCotizacion.value = cotizacion
    formData.value = {
        id: cotizacion.id,
        estado: cotizacion.estado || 'pendiente',
        respuesta: cotizacion.respuesta || '',
        monto: cotizacion.monto || ''
    }
    showFormModal.value = true
}

function openDeleteModal(cotizacion) {
    selectedCotizacion.value = cotizacion
    showDeleteModal.value = true
}

async function saveCotizacion() {
    if (!formData.value.respuesta) {
        store.alert = { color: 'warning', texto: 'Por favor ingresa una respuesta' }
        store.showAlert = true
        return
    }

    try {
        loading.value = true
        const response = await fetch(`http://127.0.0.1:8000/api/cotizaciones/${formData.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData.value)
        })

        if (!response.ok) throw new Error('Error al guardar')

        await loadData()
        showFormModal.value = false
        store.alert = { color: 'success', texto: 'Cotización actualizada' }
        store.showAlert = true
    } catch (error) {
        store.alert = { color: 'danger', texto: 'Error al guardar cotización' }
        store.showAlert = true
    } finally {
        loading.value = false
    }
}

async function deleteCotizacion() {
    try {
        loading.value = true
        const response = await fetch(`http://127.0.0.1:8000/api/cotizaciones/${selectedCotizacion.value.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Error al eliminar')

        await loadData()
        showDeleteModal.value = false
        store.alert = { color: 'success', texto: 'Cotización eliminada' }
        store.showAlert = true
    } catch (error) {
        store.alert = { color: 'danger', texto: 'Error al eliminar cotización' }
        store.showAlert = true
    } finally {
        loading.value = false
    }
}

function getStatusBadge(estado) {
    const statusMap = {
        'pendiente': 'warning',
        'respondida': 'success',
        'rechazada': 'danger'
    }
    return statusMap[estado] || 'secondary'
}
</script>

<template>
    <section>
        <div class="container">
            <div class="row align-items-center mb-4">
                <div class="col-lg-6">
                    <h3 class="mt-2">Gestionar Cotizaciones</h3>
                </div>
            </div>

            <!-- Filtro por estado -->
            <div class="row mb-4">
                <div class="col-lg-4">
                    <label class="form-label fw-bold">Filtrar por estado</label>
                    <select v-model="statusFilter" class="form-select px-2">
                        <option value="todas">Todas</option>
                        <option value="pendiente">Pendientes</option>
                        <option value="respondida">Respondidas</option>
                        <option value="rechazada">Rechazadas</option>
                    </select>
                </div>
            </div>

            <!-- Tabla de Cotizaciones -->
            <div class="table-responsive">
                <table class="table table-striped align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Usuario</th>
                            <th>Telefono</th>
                            <th>Productos Solicitados</th>
                            <th>Estado</th>
                            <th>Monto Cotizado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cotizacion in cotizacionesFiltradas" :key="cotizacion.id">
                            <td class="fw-bold">{{ cotizacion.usuario_nombre || 'Usuario' }}</td>
                            <td>{{ cotizacion.telefono || 'N/A' }}</td>
                            <td>{{ cotizacion.producto_nombre || 'N/A' }}</td>
                            <td>
                                <span class="badge" :class="`bg-${getStatusBadge(cotizacion.estado)}`">
                                    {{ cotizacion.estado }}
                                </span>
                            </td>
                            <td>${{ cotizacion.monto || '0.00' }}</td>
                            <td>
                                <button @click="openRespondForm(cotizacion)" class="btn btn-sm btn-warning me-2"
                                    title="Responder">
                                    <i class="material-icons" :style="{fontSize: '12px'}">reply</i>
                                </button>
                                <button @click="openDeleteModal(cotizacion)" class="btn btn-sm btn-danger"
                                    title="Eliminar">
                                    <i class="material-icons" :style="{fontSize: '12px'}">delete</i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="cotizacionesFiltradas.length === 0" class="alert alert-info text-center">
                    No hay cotizaciones que mostrar
                </div>
            </div>
        </div>
    </section>

    <!-- Modal Responder Cotización -->
    <Teleport to="body">
        <div v-if="showFormModal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Responder Cotización</h5>
                    <button @click="showFormModal = false" class="btn-close"></button>
                </div>

                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Estado</label>
                        <select v-model="formData.estado" class="form-select">
                            <option value="pendiente">Pendiente</option>
                            <option value="respondida">Respondida</option>
                            <option value="rechazada">Rechazada</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold">Monto Cotizado</label>
                        <input v-model="formData.monto" type="number" step="0.01" class="form-control"
                            placeholder="0.00" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold">Respuesta/Notas *</label>
                        <textarea v-model="formData.respuesta" class="form-control" rows="4"
                            placeholder="Escriba la respuesta o notas sobre la cotización"></textarea>
                    </div>
                </div>

                <div class="modal-footer">
                    <button @click="showFormModal = false" class="btn btn-secondary">
                        Cancelar
                    </button>
                    <button @click="saveCotizacion" :disabled="loading" class="btn btn-dark">
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
                    <p>¿Estás seguro de que deseas eliminar esta cotización?</p>
                    <p class="text-muted small">Esta acción no se puede deshacer.</p>
                </div>
                <div class="modal-footer">
                    <button @click="showDeleteModal = false" class="btn btn-secondary">
                        Cancelar
                    </button>
                    <button @click="deleteCotizacion" :disabled="loading" class="btn btn-danger">
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

.badge {
    padding: 0.35rem 0.65rem;
}
</style>
