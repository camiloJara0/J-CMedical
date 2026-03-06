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
    window.location.href = '/'

  } catch (error) {
    console.error('Error al enviar:', error);
    store.mostrarAlerta('Hubo un problema al enviar el mensaje', 'danger');
  }

  store.cargando = false
}
</script>
<template>
  <!-- <DefaultNavbar
    transparent
    :action="{
      color: 'btn-white',
      route: 'https://www.creative-tim.com/product/vue-material-kit-pro',
      label: 'Buy Now',
    }"
  /> -->
  <div class="p-0 m-0" style="background: #f3f3f3; height: 100dvh;">
    <div
      class="page-header align-items-start min-height-300 m-3 border-radius-xl"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1949&q=80)',
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
    </div>
  <div class="container mb-4">
    <div class="row mt-lg-n12 mt-md-n12 mt-n12 justify-content-center">
      <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
        <div class="card mt-8">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1 text-center py-4"
            >
              <h4 class="font-weight-bolder text-white mt-1">Iniciar Sesión</h4>
              <p class="mb-1 text-sm text-white">
                Escribe tu correo y contraseña para ingresar
              </p>
            </div>
          </div>
          <div class="card-body">
            <form role="form" class="text-start">
              <MaterialInput
                id="email"
                class="input-group-static mb-4"
                label="Correo"
                type="email"
                placeholder="john@email.com"
                v-model="formData.correo" :modelValue="formData.correo"
              />
              <MaterialInput
                id="password"
                class="input-group-static mb-4"
                label="Contraseña"
                type="password"
                placeholder="•••••••••••••"
                v-model="formData.contraseña" :modelValue="formData.contraseña"
              />
              <MaterialSwitch
                class="d-flex align-items-center mb-3"
                id="rememberMe"
                labelClass="mb-0 ms-3"
                checked
                >Recordarme</MaterialSwitch
              >
              <div class="text-center">
                <MaterialButton
                  class="mt-3 mb-0"
                  variant="gradient"
                  color="dark"
                  fullWidth
                  @click="enviarFormulario"
                  >Iniciar</MaterialButton
                >
              </div>
            </form>
          </div>
          <div class="card-footer text-center pt-0 px-lg-2 px-1">
            <p class="mb-4 text-sm mx-auto">
              No tienes cuenta?
              <a class="font-bold">Registrarme</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
