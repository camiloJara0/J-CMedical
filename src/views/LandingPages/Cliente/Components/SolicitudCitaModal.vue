<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import MaterialInput from "../../../../components/MaterialInput.vue";
import MaterialTextArea from "../../../../components/MaterialTextArea.vue";
import MaterialButton from "../../../../components/MaterialButton.vue";
import setMaterialInput from "@/assets/js/material-input";
import { useAppStore } from "../../../../stores";
import { enviarSolicitudCita, validarNIT, validarSerial } from "../../../../core/SolicitudCita/PostSolicitudCita";

const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['cerrar']);

const store = useAppStore();
const { mostrarAlerta } = useAppStore();

const siteKey = '0x4AAAAAAEneIlOprDD2sZol'
const token = ref('')

const paso = ref(1);
const cargandoValidacion = ref(false);
const clienteRegistrado = ref(false);
const equipoRegistrado = ref(false);
const enviado = ref(false);
const animandoPaso = ref('slide-in');
const direccionAnimacion = ref('adelante');

const formData = ref({
  NIT: '',
  razon_social: '',
  nombre_contacto: '',
  correo: '',
  telefono: '',
  serial_equipo: '',
  marca: '',
  modelo: '',
  tipo_equipo_descripcion: '',
  tipo_cita: 'mantenimiento',
  motivo: '',
});

let timeoutNIT = null;
let timeoutSerial = null;

onMounted(() => {
  window.turnstileCallbackCita = (tokenn) => {
    token.value = tokenn;
  };
})

watch(() => props.show, async (nuevoValor) => {
  if (nuevoValor) {
    await nextTick()
    // Re-renderizar Turnstile cuando el modal se abre
    if (window.turnstile) {
      const container = document.querySelector('.sc-modal-overlay .cf-turnstile')
      if (container) {
        window.turnstile.render(container, {
          sitekey: siteKey,
          callback: window.turnstileCallbackCita,
        })
      }
    }
  }
})

watch(() => formData.value.NIT, (nuevoNIT) => {
  if (timeoutNIT) clearTimeout(timeoutNIT);
  clienteRegistrado.value = false;
  if (nuevoNIT && nuevoNIT.length >= 5) {
    timeoutNIT = setTimeout(() => validarClienteNIT(nuevoNIT), 600);
  }
});

watch(() => formData.value.serial_equipo, (nuevoSerial) => {
  if (timeoutSerial) clearTimeout(timeoutSerial);
  equipoRegistrado.value = false;
  if (nuevoSerial && nuevoSerial.length >= 3) {
    timeoutSerial = setTimeout(() => validarEquipoSerial(nuevoSerial), 600);
  }
});

async function validarClienteNIT(nit) {
  cargandoValidacion.value = true;
  try {
    const resultado = await validarNIT(nit);
    if (resultado.existe) {
      clienteRegistrado.value = true;
      formData.value.nombre_contacto = resultado.data.nombre || '';
      formData.value.correo = resultado.data.correo || '';
      formData.value.telefono = resultado.data.telefono || '';
    }
  } catch (e) {
    console.error(e);
  }
  cargandoValidacion.value = false;
}

async function validarEquipoSerial(serial) {
  cargandoValidacion.value = true;
  try {
    const resultado = await validarSerial(serial);
    if (resultado.existe) {
      equipoRegistrado.value = true;
      formData.value.marca = resultado.data.marca || '';
      formData.value.modelo = resultado.data.modelo || '';
      formData.value.tipo_equipo_descripcion = resultado.data.nombre || '';
    }
  } catch (e) {
    console.error(e);
  }
  cargandoValidacion.value = false;
}

function siguientePaso() {
  if (paso.value === 1 && !formData.value.nombre_contacto) {
    mostrarAlerta('Por favor completa el nombre de contacto.', 'warning');
    return;
  }
  if (paso.value === 2 && !formData.value.tipo_cita) {
    mostrarAlerta('Selecciona un tipo de cita.', 'warning');
    return;
  }
  direccionAnimacion.value = 'adelante';
  animandoPaso.value = 'slide-out';
  setTimeout(() => {
    paso.value++;
    animandoPaso.value = 'slide-in';
  }, 250);
}

function pasoAnterior() {
  direccionAnimacion.value = 'atras';
  animandoPaso.value = 'slide-out';
  setTimeout(() => {
    paso.value--;
    animandoPaso.value = 'slide-in';
  }, 250);
}

async function enviarSolicitud() {
  if (!formData.value.nombre_contacto) {
    mostrarAlerta('El nombre de contacto es requerido.', 'warning');
    return;
  }

  if (!token.value) {
    mostrarAlerta('Completa la verificación de seguridad.', 'warning');
    return;
  }

  store.cargando = true;
  try {
    await enviarSolicitudCita({ ...formData.value, turnstile_token: token.value });
    enviado.value = true;
    mostrarAlerta('Solicitud enviada correctamente. Nos contactaremos pronto.', 'success');
  } catch (error) {
    mostrarAlerta('Hubo un problema al enviar la solicitud.', 'danger');
  }
  store.cargando = false;
}

function cerrarModal() {
  if (enviado.value) {
    formData.value = {
      NIT: '', razon_social: '', nombre_contacto: '', correo: '', telefono: '',
      serial_equipo: '', marca: '', modelo: '', tipo_equipo_descripcion: '',
      tipo_cita: 'mantenimiento', motivo: '',
    };
    paso.value = 1;
    enviado.value = false;
    clienteRegistrado.value = false;
    equipoRegistrado.value = false;
  }
  emit('cerrar');
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="show" class="sc-modal-overlay" @click.self="cerrarModal">
        <div class="sc-modal-container">
          <div class="sc-modal-card">

            <!-- HEADER -->
            <div class="sc-modal-header">
              <div class="sc-header-content">
                <i class="material-icons sc-header-icon">build</i>
                <div>
                  <h3 class="sc-header-title">Solicitar Cita de Mantenimiento</h3>
                  <p class="sc-header-subtitle">Complete los datos para agendar su servicio</p>
                </div>
              </div>
              <button class="sc-close-btn" @click="cerrarModal">
                <i class="material-icons">close</i>
              </button>
            </div>

            <!-- PROGRESS BAR -->
            <div class="sc-progress-bar">
              <div class="sc-progress-fill" :style="{ width: (paso / 3) * 100 + '%' }"></div>
            </div>
            <div class="sc-step-indicators">
              <div class="sc-step-dot" :class="{ active: paso >= 1, completed: paso > 1 }">
                <i v-if="paso > 1" class="material-icons">check</i>
                <span v-else>1</span>
              </div>
              <div class="sc-step-line" :class="{ active: paso > 1 }"></div>
              <div class="sc-step-dot" :class="{ active: paso >= 2, completed: paso > 2 }">
                <i v-if="paso > 2" class="material-icons">check</i>
                <span v-else>2</span>
              </div>
              <div class="sc-step-line" :class="{ active: paso > 2 }"></div>
              <div class="sc-step-dot" :class="{ active: paso >= 3 }">
                <span>3</span>
              </div>
            </div>

            <!-- BODY -->
            <div class="sc-modal-body">
              <div class="sc-paso-container" :class="animandoPaso">

                <!-- PASO 1: Datos del Cliente -->
                <div v-if="paso === 1" class="sc-paso">
                  <h4 class="sc-paso-titulo">
                    <i class="material-icons sc-paso-icono">person</i>
                    Datos del Cliente
                  </h4>

                  <div class="row">
                    <div class="col-md-6">
                      <MaterialInput class="input-group-static mb-3" type="text"
                        label="NIT o Cédula" placeholder="Ej. 900123456"
                        v-model="formData.NIT" :modelValue="formData.NIT" />
                    </div>
                    <div class="col-md-6">
                      <div class="sc-validacion-badge" v-if="cargandoValidacion">
                        <div class="sc-spinner-sm"></div>
                        <span>Validando...</span>
                      </div>
                      <div class="sc-validacion-badge sc-badge-success" v-else-if="clienteRegistrado">
                        <i class="material-icons">check_circle</i>
                        <span>Cliente registrado</span>
                      </div>
                    </div>
                  </div>

                  <template v-if="!clienteRegistrado">
                    <div class="row">
                      <div class="col-md-6">
                        <MaterialInput class="input-group-static mb-3" type="text"
                          label="Razón Social" placeholder="Empresa S.A.S"
                          v-model="formData.razon_social" :modelValue="formData.razon_social" />
                      </div>
                      <div class="col-md-6">
                        <MaterialInput class="input-group-static mb-3" type="text"
                          label="Nombre Contacto *" placeholder="Juan Perez"
                          v-model="formData.nombre_contacto" :modelValue="formData.nombre_contacto" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <MaterialInput class="input-group-static mb-3" type="email"
                          label="Correo" placeholder="correo@empresa.com"
                          v-model="formData.correo" :modelValue="formData.correo" />
                      </div>
                      <div class="col-md-6">
                        <MaterialInput class="input-group-static mb-3" type="text"
                          label="Teléfono" placeholder="3001234567"
                          v-model="formData.telefono" :modelValue="formData.telefono" />
                      </div>
                    </div>
                  </template>

                  <template v-else>
                    <div class="sc-cliente-info">
                      <div class="sc-info-row">
                        <span class="sc-info-label">Nombre:</span>
                        <span class="sc-info-value">{{ formData.nombre_contacto }}</span>
                      </div>
                      <div class="sc-info-row">
                        <span class="sc-info-label">Correo:</span>
                        <span class="sc-info-value">{{ formData.correo || 'No registrado' }}</span>
                      </div>
                      <div class="sc-info-row">
                        <span class="sc-info-label">Teléfono:</span>
                        <span class="sc-info-value">{{ formData.telefono || 'No registrado' }}</span>
                      </div>
                    </div>
                  </template>
                </div>

                <!-- PASO 2: Datos del Equipo -->
                <div v-if="paso === 2" class="sc-paso">
                  <h4 class="sc-paso-titulo">
                    <i class="material-icons sc-paso-icono">precision_manufacturing</i>
                    Datos del Equipo
                  </h4>

                  <div class="row">
                    <div class="col-md-6">
                      <MaterialInput class="input-group-static mb-3" type="text"
                        label="Serial del Equipo" placeholder="Número de serie"
                        v-model="formData.serial_equipo" :modelValue="formData.serial_equipo" />
                    </div>
                    <div class="col-md-6">
                      <div class="sc-validacion-badge" v-if="cargandoValidacion">
                        <div class="sc-spinner-sm"></div>
                        <span>Validando...</span>
                      </div>
                      <div class="sc-validacion-badge sc-badge-success" v-else-if="equipoRegistrado">
                        <i class="material-icons">check_circle</i>
                        <span>Equipo registrado</span>
                      </div>
                    </div>
                  </div>

                  <template v-if="!equipoRegistrado">
                    <div class="row">
                      <div class="col-md-6">
                        <MaterialInput class="input-group-static mb-3" type="text"
                          label="Marca" placeholder="Ej. Philips, GE"
                          v-model="formData.marca" :modelValue="formData.marca" />
                      </div>
                      <div class="col-md-6">
                        <MaterialInput class="input-group-static mb-3" type="text"
                          label="Modelo" placeholder="Modelo del equipo"
                          v-model="formData.modelo" :modelValue="formData.modelo" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <MaterialInput class="input-group-static mb-3" type="text"
                          label="Descripción / Tipo de Equipo" placeholder="Ej. Monitor de signos vitales"
                          v-model="formData.tipo_equipo_descripcion" :modelValue="formData.tipo_equipo_descripcion" />
                      </div>
                    </div>
                  </template>

                  <template v-else>
                    <div class="sc-cliente-info">
                      <div class="sc-info-row">
                        <span class="sc-info-label">Marca:</span>
                        <span class="sc-info-value">{{ formData.marca || 'No registrada' }}</span>
                      </div>
                      <div class="sc-info-row">
                        <span class="sc-info-label">Modelo:</span>
                        <span class="sc-info-value">{{ formData.modelo || 'No registrado' }}</span>
                      </div>
                      <div class="sc-info-row">
                        <span class="sc-info-label">Tipo:</span>
                        <span class="sc-info-value">{{ formData.tipo_equipo_descripcion || 'No registrado' }}</span>
                      </div>
                    </div>
                  </template>
                </div>

                <!-- PASO 3: Detalles de la Cita -->
                <div v-if="paso === 3 && !enviado" class="sc-paso">
                  <h4 class="sc-paso-titulo">
                    <i class="material-icons sc-paso-icono">event</i>
                    Detalles de la Solicitud
                  </h4>

                  <div class="row">
                    <div class="col-12">
                      <label class="sc-select-label">Tipo de Cita *</label>
                      <div class="sc-tipo-cita-grid">
                        <label v-for="tipo in [
                          { value: 'mantenimiento', icon: 'settings', label: 'Mantenimiento' },
                          { value: 'revision', icon: 'search', label: 'Revisión' },
                          { value: 'reparacion', icon: 'build', label: 'Reparación' },
                          { value: 'otro', icon: 'more_horiz', label: 'Otro' }
                        ]" :key="tipo.value"
                          class="sc-tipo-option" :class="{ selected: formData.tipo_cita === tipo.value }">
                          <input type="radio" :value="tipo.value" v-model="formData.tipo_cita" class="sc-radio-hidden" />
                          <i class="material-icons">{{ tipo.icon }}</i>
                          <span>{{ tipo.label }}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-12">
                      <MaterialTextArea class="input-group-static mb-3" :rows="3"
                        placeholder="Describa el motivo de la solicitud..."
                        v-model="formData.motivo" :modelValue="formData.motivo">
                        Motivo
                      </MaterialTextArea>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-12 text-center">
                      <div class="cf-turnstile rounded" :data-sitekey="siteKey" data-callback="turnstileCallbackCita"></div>
                    </div>
                  </div>
                </div>

                <!-- PASO 3: Confirmación -->
                <div v-if="paso === 3 && enviado" class="sc-paso sc-confirmacion">
                  <div class="sc-confirm-icon">
                    <i class="material-icons">check_circle</i>
                  </div>
                  <h4 class="sc-confirm-title">¡Solicitud Enviada!</h4>
                  <p class="sc-confirm-text">
                    Hemos recibido su solicitud de cita de mantenimiento.
                    Nos contactaremos pronto para confirmar los detalles.
                  </p>
                </div>

              </div>
            </div>

            <!-- FOOTER -->
            <div class="sc-modal-footer">
              <template v-if="!enviado">
                <MaterialButton v-if="paso > 1" @click="pasoAnterior" variant="outline" class="sc-btn-secundario">
                  Anterior
                </MaterialButton>
                <div class="sc-footer-spacer"></div>
                <MaterialButton v-if="paso < 3" @click="siguientePaso" variant="gradient" class="sc-btn-primario">
                  Siguiente
                </MaterialButton>
                <MaterialButton v-else @click="enviarSolicitud" variant="gradient" class="sc-btn-primario"
                  :disabled="store.cargando">
                  {{ store.cargando ? 'Enviando...' : 'Enviar Solicitud' }}
                </MaterialButton>
              </template>
              <template v-else>
                <div class="sc-footer-spacer"></div>
                <MaterialButton @click="cerrarModal" variant="gradient" class="sc-btn-primario">
                  Cerrar
                </MaterialButton>
              </template>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sc-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
  animation: fadeIn 0.25s ease;
}

.sc-modal-container {
  width: 95%;
  max-width: 650px;
  max-height: 90vh;
  display: flex;
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sc-modal-card {
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.sc-modal-header {
  background: linear-gradient(135deg, #2262a3 0%, #264e78 100%);
  color: white;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sc-header-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.sc-header-icon {
  font-size: 32px;
  opacity: 0.9;
}

.sc-header-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.sc-header-subtitle {
  margin: 2px 0 0;
  font-size: 0.8rem;
  opacity: 0.8;
}

.sc-close-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.sc-close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.sc-progress-bar {
  height: 4px;
  background: #e9ecef;
  position: relative;
}
.sc-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2262a3, #3b7bbc);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0 2px 2px 0;
}

.sc-step-indicators {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px 8px;
  gap: 0;
}

.sc-step-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e9ecef;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  transition: all 0.3s;
}
.sc-step-dot.active {
  background: #2262a3;
  color: white;
  box-shadow: 0 2px 8px rgba(34, 98, 163, 0.4);
}
.sc-step-dot.completed {
  background: #28a745;
  color: white;
}
.sc-step-dot .material-icons {
  font-size: 18px;
}

.sc-step-line {
  width: 60px;
  height: 3px;
  background: #e9ecef;
  margin: 0 8px;
  border-radius: 2px;
  transition: background 0.3s;
}
.sc-step-line.active {
  background: #2262a3;
}

.sc-modal-body {
  padding: 8px 24px 16px;
  overflow-y: auto;
  flex: 1;
}

.sc-paso-container {
  min-height: 200px;
}

.sc-paso-titulo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2262a3;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e9ecef;
}

.sc-paso-icono {
  font-size: 22px;
}

.sc-validacion-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
  background: #f0f0f0;
  margin-top: 8px;
}
.sc-badge-success {
  background: #d4edda;
  color: #155724;
}
.sc-badge-success .material-icons {
  font-size: 18px;
  color: #28a745;
}

.sc-spinner-sm {
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-top-color: #2262a3;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.sc-cliente-info {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 14px 18px;
  margin-top: 12px;
  border-left: 4px solid #28a745;
}

.sc-info-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}
.sc-info-row:last-child {
  margin-bottom: 0;
}
.sc-info-label {
  font-weight: 700;
  color: #555;
  min-width: 90px;
}
.sc-info-value {
  color: #333;
}

.sc-select-label {
  font-weight: 700;
  color: #333;
  font-size: 0.85rem;
  margin-bottom: 8px;
  display: block;
}

.sc-tipo-cita-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.sc-tipo-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 8px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}
.sc-tipo-option:hover {
  border-color: #3b7bbc;
  background: #f0f7ff;
  transform: translateY(-2px);
}
.sc-tipo-option.selected {
  border-color: #2262a3;
  background: linear-gradient(135deg, #e8f0fe, #d4e4f7);
  box-shadow: 0 2px 10px rgba(34, 98, 163, 0.2);
}
.sc-tipo-option .material-icons {
  font-size: 28px;
  color: #2262a3;
  transition: transform 0.2s;
}
.sc-tipo-option.selected .material-icons {
  transform: scale(1.15);
}
.sc-tipo-option span {
  font-size: 0.75rem;
  font-weight: 600;
  color: #555;
}
.sc-tipo-option.selected span {
  color: #2262a3;
}

.sc-radio-hidden {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.sc-confirmacion {
  text-align: center;
  padding: 30px 20px;
}
.sc-confirm-icon .material-icons {
  font-size: 80px;
  color: #28a745;
  animation: bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.sc-confirm-title {
  color: #2262a3;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 16px 0 8px;
}
.sc-confirm-text {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

.sc-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 12px;
}

.sc-footer-spacer {
  flex: 1;
}

/* Animaciones de paso */
.slide-in {
  animation: slideInRight 0.3s ease;
}
.slide-out {
  animation: slideOutLeft 0.25s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideOutLeft {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-30px); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

/* Transition modal */
.modal-fade-enter-active { animation: fadeIn 0.25s ease; }
.modal-fade-leave-active { animation: fadeIn 0.2s ease reverse; }

@media (max-width: 576px) {
  .sc-tipo-cita-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .sc-modal-header {
    padding: 16px 18px;
  }
  .sc-header-title {
    font-size: 1.1rem;
  }
  .sc-modal-body {
    padding: 8px 18px 12px;
  }
}
</style>
