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
    <div class="d-flex justify-content-center my-3">
      <div class="ux-toggle" @click="store.cotizar = !store.cotizar">
        <div 
          class="ux-toggle-slider"
          :class="{ 'active': store.cotizar }"
        ></div>

        <span class="ux-toggle-label left">Contactar</span>
        <span class="ux-toggle-label right">Cotizar</span>
      </div>
    </div>
    <div class="page-header max-vh-80">

      <div class="container">
        <div v-if="store.cotizar" class="row">
          <div
            class="col-6 d-lg-flex d-none h-100 my-md-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
            <div class="position-relative h-100 m-3 border-radius-lg d-flex flex-column justify-content-center" :style="{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }" loading="lazy">

              <!-- Overlay con degradado -->
              <div v-if="store.carrito.length" class="h-100 w-100 d-flex flex-column rounded-2 p-4 overflow-auto"
                :style="{
                  background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8))'
                }">

                <h4 class="text-white fw-bold mb-3">Productos añadidos</h4>

                <div v-for="product in store.carrito" :key="product.id"
                  class="bg-white rounded-3 shadow-sm p-3 mb-3 d-flex align-items-center gap-3 position-relative">
                  <img :src="product.imagen" :alt="product.nombre" width="100" height="80"
                    class="rounded-2 object-fit-cover">
                  <div class="text-start">
                    <p class="mb-1 fw-semibold text-dark">{{ product.nombre }}</p>
                    <small class="text-muted">Precio: {{ product.precio_referencial }}</small>
                  </div>
                  <div class="position-absolute end-1">
                    <div class="d-flex justify-center align-items-center rounded-circle cursor-pointer"
                      @click="store.eliminarProducto(product)">
                      <i class="material-icons me-2 color-warning">close</i>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="d-lg-none" v-if="store.carrito.length">
            <div class="position-relative h-100 m-3 border-radius-lg d-flex flex-column justify-content-center" :style="{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }" loading="lazy">

              <!-- Overlay con degradado -->
              <div class="h-100 w-100 d-flex gap-2 rounded-2 p-4 overflow-x-auto"
                :style="{
                  background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8))'
                }">

                <div v-for="product in store.carrito" :key="product.id"
                  class="bg-white rounded-3 shadow-sm p-3 mb-3 d-flex flex-column align-items-center gap-3 position-relative">
                  <img :src="product.imagen" :alt="product.nombre" width="100" height="80"
                    class="rounded-2 object-fit-cover">
                  <div class="text-start">
                    <p class="mb-1 fw-semibold text-dark">{{ product.nombre }}</p>
                    <small class="text-muted">Precio: {{ product.precio_referencial }}</small>
                  </div>
                  <div class="position-absolute end-1">
                    <div class="d-flex justify-center align-items-center rounded-circle cursor-pointer"
                      @click="store.eliminarProducto(product)">
                      <i class="material-icons me-2 color-warning">close</i>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="mt-md-0 col-xl-5 col-lg-6 col-md-10 col-12 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
            <div class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-md-8 mt-4 mb-5">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div class="bg-custom-default shadow-dark border-radius-lg p-3">
                  <h3 class="text-white mb-0">Solicitar Cotización</h3>
                </div>
              </div>
              <div class="card-body">
                <p class="pb-3 d-md-block d-none">
                  Déjanos tus datos y brevemente nos pondremos en contacto contigo para brindarte la
                  información que necesitas.
                </p>
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
                          placeholder="Número de Celular" v-model="formData.telefono" :modelValue="formData.telefono" />
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

              </div>
            </div>
          </div>
        </div>

        <div v-if="!store.cotizar">
          <div class="mt-md-0 col-xl-5 col-lg-6 col-md-10 col-12 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
            <div class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-md-8 mt-4 mb-5">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div class="bg-custom-default shadow-dark border-radius-lg p-3">
                  <h3 class="text-white mb-0">Contactarnos</h3>
                </div>
              </div>
              <div class="card-body">
                <p class="pb-3 d-md-block d-none">
                  Al hacer clic en "contactarnos" te redirigiremos a nuestro whatsapp, para que puedas hablar con uno de nuestros asesores.
                </p>
                <div>
                  <a href="https://wa.me/573053737373" target="_blank" class="btn btn-success d-flex align-items-center gap-2 justify-content-center w-100">
                    <span class="material-icons">whatsapp</span>Contactarnos
                  </a>
                </div>

              </div>
            </div>
          </div>
          <div
            class="col-6 d-lg-flex d-none h-100 my-md-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
            <div class="position-relative h-100 m-3 border-radius-lg d-flex flex-column justify-content-center" :style="{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }" loading="lazy">

              <!-- Overlay con degradado -->
              <div v-if="store.carrito.length" class="h-100 w-100 d-flex flex-column rounded-2 p-4 overflow-auto"
                :style="{
                  background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8))'
                }">

                <h4 class="text-white fw-bold mb-3">Productos añadidos</h4>

                <div v-for="product in store.carrito" :key="product.id"
                  class="bg-white rounded-3 shadow-sm p-3 mb-3 d-flex align-items-center gap-3 position-relative">
                  <img :src="product.imagen" :alt="product.nombre" width="100" height="80"
                    class="rounded-2 object-fit-cover">
                  <div class="text-start">
                    <p class="mb-1 fw-semibold text-dark">{{ product.nombre }}</p>
                    <small class="text-muted">Precio: {{ product.precio_referencial }}</small>
                  </div>
                  <div class="position-absolute end-1">
                    <div class="d-flex justify-center align-items-center rounded-circle cursor-pointer"
                      @click="store.eliminarProducto(product)">
                      <i class="material-icons me-2 color-warning">close</i>
                    </div>
                  </div>
                </div>

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

.ux-toggle-slider.active ~ .right {
  color: #fff;
}

.ux-toggle-slider:not(.active) ~ .left {
  color: #fff;
}

.ux-side-panel {
  border-radius: 16px;
  height: 100%;
  min-height: 500px;
  display: flex;
}

.ux-overlay {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85));
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
</style>
