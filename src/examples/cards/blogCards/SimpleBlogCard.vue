<script setup>
import { useAppStore } from '../../../stores';

defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  action: {
    type: Object,
    color: String,
    label: String,
    default: () => ({
      color: "bg-custom-default",
    }),
  },
  producto: {
    type: Object,
    required: true,
  }
});

const store = useAppStore()
</script>
<template>
  <div class="card card-custom" @click="action.action(producto)">
    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
      <a class="d-block blur-shadow-image">
        <img :src="image || 'src/assets/img/errorImagen.jpg'" :alt="`Imagen de ${producto.nombre}`" class="img-thumbnail shadow border-radius-lg" loading="lazy"
          @error="e => e.target.src = 'src/assets/img/errorImagen.jpg'" />
      </a>
    </div>
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="font-weight-normal w-100 text-center">{{ title }}</h5>
      <p class="card-description">
        {{ description }}
      </p>
      <div class="d-flex justify-content-center gap-2 mt-auto">
        <button class="btn btn-sm btn-animated text-truncate" :class="`btn-outline-${action.color} `"
          @click.stop="action.action(producto)">
          Más Información
        </button>
        <button class="btn btn-sm btn-animated d-flex justify-content-center align-items-center gap-2 text-truncate"
          :class="`btn-outline-success `" @click.stop="store.agregarProducto(producto)">
          Añadir <i class="material-icons color-success fs-5">shopping_cart</i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-custom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 27rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card-custom:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card-custom img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 0.5rem;
  transition: transform 0.3s ease;
}

.card-custom:hover img {
  transform: scale(1.03);
}

.card-description {
  display: -webkit-box;
  display: box; /* fallback */
  line-clamp: 1; /* estándar */
  -webkit-line-clamp: 1; /* Máximo 3 líneas */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.5rem 0;
}

.btn-animated {
  transition: all 0.25s ease;
}

.btn-animated:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
</style>
