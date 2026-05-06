<script setup>
import { onMounted, ref } from "vue";
import image from "/mano-en-guante-medico-apuntando-la-tecnologia-medica-de-pantalla-virtual.jpg"

//material components
import MaterialInput from "../../../../components/MaterialInput.vue"
import MaterialTextArea from "../../../../components/MaterialTextArea.vue";
import MaterialButton from "../../../../components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import { useAppStore } from "../../../../stores";
import { enviarCotizacion } from "../../../../core/Cotizaciones/PostCotizacion";

onMounted(() => {
  setMaterialInput();
});

const store = useAppStore();
const { mostrarAlerta } = useAppStore()

onMounted(() => {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    store.carrito = JSON.parse(carritoGuardado);
  }
})

const formData = ref({
  nombre: '',
  correo: '',
  nit: '',
  file: '',
  mensaje: '',
  telefono: '',
  productos: store.carrito || [],
})

async function enviarMensaje(event) {
  event.preventDefault();
  store.cargando = true
  formData.value.productos = store.carrito
  const { nombre, correo, nit, mensaje, file, productos } = formData.value;


  // Validaciones
  if (!nombre || !correo || !nit || !mensaje) {
    mostrarAlerta('Por favor completa todos los campos.', 'warning');
    store.cargando = false
    return;
  }

  if (!validarCorreo(correo)) {
    mostrarAlerta('El correo electrónico no es válido.', 'warning');
    store.cargando = false
    return;
  }

  if (nit.length < 5) {
    mostrarAlerta('El NIT debe tener al menos 5 caracteres.', 'warning');
    store.cargando = false
    return;
  }

  if (mensaje.length < 10) {
    mostrarAlerta('El mensaje debe tener al menos 10 caracteres.', 'warning');
    store.cargando = false
    return;
  }

  if (productos.length < 1) {
    mostrarAlerta('Añade algun producto al carrito para solicitar cotización.', 'warning');
    store.cargando = false
    return;
  }

  if (file && !(file instanceof File)) {
    mostrarAlerta('El archivo no es valido.', 'warning');
    store.cargando = false
    return
  }

  // Si todo está bien, enviar el mensaje
  try {

    const respuesta = await enviarCotizacion(formData.value)

    mostrarAlerta('Mensaje enviado correctamente', 'success');

    formData.value = {
      nombre: '',
      correo: '',
      telefono: '',
      nit: '',
      file: '',
      mensaje: '',
    }

    store.carrito = []
  } catch (error) {
    console.error('Error al enviar:', error);
    mostrarAlerta('Hubo un problema al enviar el mensaje', 'danger');
  }

  store.cargando = false
}

// Validación de correo electrónico
function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

</script>
<template>

  <section>

    <div class="page-header max-vh-80">

      <div class="container">
        <div class="row py-2">

          <!-- TOGGLE -->
          <!-- (va aquí el switch de arriba) -->
          <div class="d-flex justify-content-center my-3">
            <div class="ux-toggle" @click="store.cotizar = !store.cotizar">
              <div class="ux-toggle-slider" :class="{ 'active': store.cotizar }"></div>

              <span class="ux-toggle-label left">Contactar</span>
              <span class="ux-toggle-label right">Cotizar</span>
            </div>
          </div>
        </div>

        <div class="row position-relative align-items-center" :class="{ 'flex-lg-row-reverse': !store.cotizar }">

          <!-- CARRITO / IMAGEN -->
          <div class="col-lg-6 d-lg-flex">
            <div class="ux-side-panel w-100 m-3" :style="{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }">

              <div v-if="store.carrito.length && store.cotizar" class="ux-overlay p-4">

                <h4 class="text-white fw-bold mb-3">Productos añadidos</h4>

                <div v-for="product in store.carrito" :key="product.id" class="ux-product-card">

                  <img :src="product.imagen" width="80">

                  <div>
                    <p class="mb-1 fw-semibold">{{ product.nombre }}</p>
                    <small>{{ product.precio_referencial }}</small>
                  </div>

                  <i class="material-icons ux-remove" @click="store.eliminarProducto(product)">
                    close
                  </i>
                </div>

              </div>
            </div>
          </div>
          

          <!-- PANEL DERECHO -->
          <div class="col-xl-5 col-lg-6 col-md-10 col-12 mx-auto">

            <div class="card shadow-lg mt-4 mb-5">

              <!-- HEADER DINÁMICO -->
              <div class="card-header bg-custom-default shadow-dark text-white">
                <h3 class="mb-0 text-white">
                  {{ store.cotizar ? 'Solicitar Cotización' : 'Contactar' }}
                </h3>
              </div>

              <div class="card-body">

                <!-- CONTENIDO DINÁMICO -->
                <template v-if="store.cotizar">

                  <!-- FORMULARIO -->
                  <form id="contact-form" method="post" autocomplete="off">
                    <div class="card-body p-0 my-3">
                      <div class="row">
                        <div class="col-md-6">
                          <MaterialInput class="input-group-static mb-4" type="text" label="Nombre completo *"
                            placeholder="Ej. Juan Perez" v-model="formData.nombre" :modelValue="formData.nombre" />
                        </div>
                        <div class="col-md-6 ps-md-2">
                          <MaterialInput class="input-group-static mb-4" type="email" label="Correo *"
                            placeholder="juan@gmail.com" v-model="formData.correo" :modelValue="formData.correo" />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <MaterialInput class="input-group-static mb-4" type="text" label="NIT o Cédula *"
                            placeholder="Digita NIT o Cédula" v-model="formData.nit" :modelValue="formData.nit" />
                        </div>
                        <div class="col-md-6">
                          <MaterialInput class="input-group-static mb-4" type="text" label="Telefono"
                            placeholder="Número de Celular" v-model="formData.telefono"
                            :modelValue="formData.telefono" />
                        </div>
                        <div class="col-12">
                          <MaterialInput class="input-group-static mb-4" type="file"
                            label="Adjuntar imagenes de conector (<50Mb)" inputClass="px-3"
                            @change="e => formData.file = e.target.files[0]" />
                        </div>
                      </div>
                      <div class="form-group mb-0 mt-md-0 mt-4">
                        <MaterialTextArea id="message" class="input-group-static mb-4" :rows="4"
                          placeholder="Necesito conector..." v-model="formData.mensaje" :modelValue="formData.mensaje">
                          Descripcion *
                        </MaterialTextArea>
                      </div>
                      <div class="row">
                        <div class="col-md-12 text-center">
                          <MaterialButton @click="enviarMensaje" variant="gradient" class="mt-3 mb-0">
                            {{ store.cargando ? 'Cargando...' : 'Enviar mensaje' }}
                          </MaterialButton>
                        </div>
                      </div>
                    </div>
                  </form>

                </template>

                <template v-else>

                  <div class="py-5">
                    <!-- CONTACTO -->
                    <p>
                      Te redirigiremos a WhatsApp para hablar con un asesor.
                    </p>

                    <a href="https://wa.me/573053737373" target="_blank"
                      class="btn btn-success w-100 d-flex justify-content-center gap-2">

                      <i class="material-icons">call</i>
                      Contactar
                    </a>
                  </div>
                </template>

              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style>
.ux-toggle {
  position: relative;
  width: 260px;
  height: 45px;
  background: #e9ecef;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 600;
}

.ux-toggle-slider {
  position: absolute;
  width: 50%;
  height: 100%;
  background: #2262a3;
  border-radius: 50px;
  transition: all 0.3s ease;
  left: 0;
}

.ux-toggle-slider.active {
  left: 50%;
}

.ux-toggle-label {
  z-index: 1;
  width: 50%;
  text-align: center;
  color: #555;
}

.ux-toggle-slider.active~.right {
  color: #fff;
}

.ux-toggle-slider:not(.active)~.left {
  color: #fff;
}

.ux-side-panel {
  border-radius: 16px;
  min-height: 80vh;
  display: flex;
}

.ux-overlay {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.85));
  border-radius: 16px;
}

.ux-product-card {
  background: white;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}

.ux-remove {
  position: absolute;
  right: 8px;
  cursor: pointer;
  color: #dc3545;
}

.bg-custom-default {
  background-color: #2262a3 !important;
}

@media (max-width: 768px) {
  .ux-side-panel{
    min-height: 40vh;
    overflow: auto;
  }
}
</style>
