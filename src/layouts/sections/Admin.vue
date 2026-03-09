<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "@/views/LandingPages/Admin/Components/NavbarDefault.vue";
import DefaultFooter from "@/views/LandingPages/Admin/Components/FooterDefault.vue";
import MaterialAlert from "@/views/LandingPages/Cliente/Components/MaterialAlert.vue";

//sections
import { useAppStore } from "@/stores";

//hooks
const body = document.getElementsByTagName("body")[0];

onMounted(() => {
  body.classList.add("coworking");
  body.classList.add("bg-gray-200");
});

onUnmounted(() => {
  body.classList.remove("coworking");
  body.classList.remove("bg-gray-200");
});

const store = useAppStore()
function cerrarModal() {
  store.showModal = false
}
</script>
<template>
  <div class="container-custom"></div>

  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault darkText :sticky="true" />
      </div>
    </div>
  </div>

  <main id="Inicio" class="card card-body blur shadow-blur mx-3 mx-md-4 mt-6 mb-4 py-sm-6 py-2" >
    <router-view />
  </main>

  <DefaultFooter />

  <!-- Alerta -->
  <div class="fondoAlert" v-if="store.showAlert">
    <MaterialAlert :dismissible="true" :color="store.alert.color" fontWeight="bold" class="m-3 mr-5">
      <p class="font-weight-bold m-0">{{ store.alert.texto }}</p>
    </MaterialAlert>
  </div>

</template>

<style scoped>
    body {
      background-color: #f4f6f9;
    }
    .navbar {
      background-color: #2262a3;
    }
    .navbar-brand {
      color: #fff;
      font-weight: bold;
    }
    .card {
      border: none;
      transition: transform 0.2s;
    }
    .card-header {
      background-color: #4169e1;
      color: #fff;
      font-weight: bold;
    }
    .btn-custom {
      background-color: #dd9d5c;
      color: #fff;
      font-weight: bold;
    }
    .btn-custom:hover {
      background-color: #c2854a;
      color: #fff;
    }


.contacto {
  background-color: #dd9d5c;
  color: white;
}

.contacto:hover {
  opacity: 0.75;
  color: white;
}

.btn-custom {
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #0000ff;
  text-transform: uppercase;
  font-size: small;
  font-weight: bold;
}

.container-custom {
  /* background: linear-gradient(180deg,rgba(244, 244, 244, 1) 3%, rgba(34, 98, 163, 1) 40%, rgba(235, 237, 240, 1) 100%); */
  background: #FFFFFF;
  background: linear-gradient(180deg,rgba(255, 255, 255, 1) 59%, rgba(237, 239, 242, 1) 91%);
  height: 160vh;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
  overflow-x: hidden;
}

.fondo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 105099999999;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  overflow-y: none;
}

.fondoAlert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 105099999999;
  display: flex;
  justify-content: end;
  align-items: start;
  overflow-y: none;
}

.modal-custom {
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
}

.header-modal-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header-modal-custom h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #ff4d4d;
}

.header-modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  max-height: 60vh;
  min-height: 40vh;
  overflow-y: auto;
}

.header-modal-body img {
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 8px;
}

.container-contacto {
  display: flex;

}
</style>
