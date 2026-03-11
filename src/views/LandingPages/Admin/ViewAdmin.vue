<script setup>
</script>
<template>
  <!-- Contenido principal -->
  <div class="container mt-2">

    <!-- Header atractivo -->
    <div class="page-header align-items-center min-height-300 mx-3 border-radius-xl position-relative" style="
      background-image: url('public/headerLogin.jpg');
      background-size: cover;
      background-position: center;
    ">
      <span class="mask" style="background: linear-gradient(135deg, rgba(34,98,163,0.8), rgba(0,0,0,0.6));"></span>
      <div class="row text-center text-white position-relative">
        <h1 class="fw-bold mb-2">Bienvenido, Administrador</h1>
        <p class="lead">Selecciona la sección a la que deseas acceder</p>
      </div>
    </div>

    <!-- Secciones -->
    <div class="row g-4 mt-3">
      <!-- Productos -->
      <div class="col-md-3">
        <div class="card shadow h-100">
          <div class="card-header bg-dark text-white d-flex align-items-center">
            <i class="material-icons me-2">storefront</i> Productos
          </div>
          <div class="card-body">
            <p>Gestiona el inventario y los detalles de tus productos.</p>
            <a href="/Admin/Productos" class="btn btn-primary w-100">Acceder</a>
          </div>
        </div>
      </div>

      <!-- Categorías -->
      <div class="col-md-3">
        <div class="card shadow h-100">
          <div class="card-header bg-dark text-white d-flex align-items-center">
            <i class="material-icons me-2">category</i> Categorías
          </div>
          <div class="card-body">
            <p>Organiza tus productos en categorías personalizadas.</p>
            <a href="/Admin/Categorias" class="btn btn-success w-100">Acceder</a>
          </div>
        </div>
      </div>

      <!-- Cotizaciones -->
      <div class="col-md-3">
        <div class="card shadow h-100">
          <div class="card-header bg-dark d-flex align-items-center">
            <i class="material-icons me-2">attach_money</i> Cotizaciones
          </div>
          <div class="card-body">
            <p>Administra las solicitudes y genera cotizaciones fácilmente.</p>
            <a href="/Admin/Cotizaciones" class="btn btn-warning w-100">Acceder</a>
          </div>
        </div>
      </div>

      <!-- Usuarios -->
      <div class="col-md-3">
        <div class="card shadow h-100">
          <div class="card-header bg-dark text-white d-flex align-items-center">
            <i class="material-icons me-2">people</i> Usuarios
          </div>
          <div class="card-body">
            <p>Controla el acceso y gestiona la información de los usuarios.</p>
            <a href="#Usuarios" class="btn btn-danger w-100">Acceder</a>
          </div>
        </div>
      </div>
    </div>
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
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 59%, rgba(237, 239, 242, 1) 91%);
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
