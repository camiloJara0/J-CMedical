<script setup>
import { onMounted } from "vue";
import { iniciarSesion } from "../../../core/Usuarios/login";
import { ref } from "vue";
// example components

//Vue Material Kit 2 Pro components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import { useAppStore } from "../../../stores";
onMounted(() => {
  setMaterialInput();
});

const store = useAppStore()
const formData = ref({
  correo: '',
  contraseña: ''
})

async function enviarFormulario(event) {
  event.preventDefault();
  store.cargando = true
  
  const { contraseña, correo } = formData.value;


  // Validaciones
  if (!contraseña || !correo ) {
    mostrarAlerta('Por favor completa todos los campos.', 'warning');
    return;
  }

  // Si todo está bien, enviar el mensaje
  try {

    const respuesta = await iniciarSesion(formData.value)

    store.mostrarAlerta('Mensaje enviado correctamente', 'success');
    store.cargando = false

  } catch (error) {
    console.error('Error al enviar:', error);
    store.mostrarAlerta('Hubo un problema al enviar el mensaje', 'danger');
  }

  store.cargando = false
}
</script>
<template>
<div class="p-0 m-0" style="background: linear-gradient(135deg, #f5efe9, #d4dfff); height: 100dvh;">
  <!-- Encabezado con imagen -->
  <div
    class="page-header align-items-start min-height-300 mx-3 border-radius-xl"
    :style="{
      backgroundImage:
        'url(public/headerLogin.jpg)',
    }"
    loading="lazy"
  >
    <span class="mask" style="background: rgba(34,98,163,0.7);"></span>
  </div>

  <!-- Contenedor principal -->
  <div class="container mb-4">
    <div class="row mt-lg-n12 mt-md-n12 mt-n12 justify-content-center">
      <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
        <div class="card shadow-lg border-0 mt-8">
          <!-- Header -->
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="shadow border-radius-lg py-4 text-center"
              style="background: linear-gradient(90deg, #2262a3, #4169e1);"
            >
              <h4 class="fw-bold text-white mb-1">Iniciar Sesión</h4>
              <p class="text-white-50 mb-0">
                Ingresa tu correo y contraseña
              </p>
            </div>
          </div>

          <!-- Body -->
          <div class="card-body px-4">
            <form role="form" class="text-start">
              <MaterialInput
                id="email"
                class="input-group-static mb-4"
                label="Correo"
                type="email"
                placeholder="john@email.com"
                v-model="formData.correo"
                :modelValue="formData.correo"
              />
              <MaterialInput
                id="password"
                class="input-group-static mb-4"
                label="Contraseña"
                type="password"
                placeholder="•••••••••••••"
                v-model="formData.contraseña"
                :modelValue="formData.contraseña"
              />

              <MaterialSwitch
                class="d-flex align-items-center mb-3"
                id="rememberMe"
                labelClass="mb-0 ms-3"
                checked
              >
                Recordarme
              </MaterialSwitch>

              <div class="text-center">
                <MaterialButton
                  class="mt-3 mb-0 px-6"
                  variant="gradient"
                  fullWidth
                  @click="enviarFormulario"
                  style="background: linear-gradient(90deg, #2262a3, #4169e1); color: '#fff';"
                >
                  Iniciar
                </MaterialButton>
              </div>
            </form>
          </div>

          <!-- Footer -->
          <div class="card-footer text-center pt-0 px-lg-2 px-1">
            <p class="mb-4 text-sm mx-auto">
              ¿No tienes cuenta?
              <a href="/" class="fw-bold" style="color:#2262a3;">Atras</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

<div class="btn-float">
  <a href="/" class="btn-circle">
    <i class="material-icons fs-5">keyboard_return</i>
    <span class="btn-text">Regresar al inicio</span>
  </a>
</div>

</div>

</template>

<style scoped>
body {
  background-color: black;
}

.btn-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.btn-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0d6efd; /* color Bootstrap primary */
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  transition: all 0.5s ease; /* delay + animación */
  overflow: hidden;
}

.btn-circle .btn-text {
  opacity: 0;
  margin-left: 10px;
  white-space: nowrap;
  transition: opacity 0.4s ease;
}

.btn-circle:hover {
  border-radius: 30px; /* deja de ser circular */
  width: auto;
  padding: 0 20px;
}

.btn-circle:hover .btn-text {
  opacity: 1;
}

</style>
