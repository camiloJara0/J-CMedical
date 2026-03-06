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
  <!-- Start Card Raised Header -->
  <div class="card card-custom">
    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 ">
      <a class="d-block blur-shadow-image">
        <img
          :src="image"
          alt="img-blur-shadow"
          class="img-thumbnail shadow border-radius-lg "
          loading="lazy"
        />
      </a>
    </div>
    <div class="card-body">
      <h5 class="font-weight-normal">{{ title }}</h5>
      <p>
        {{ description }}
      </p>
      <div class="d-flex gap-2">
        <button
          class="btn btn-sm mb-0"
          :class="`btn-outline-${action.color} bg-custom-default`"
          name="button"
          @click="action.action(title)"
        >
          Mas Información
        </button>
        <button
          class="btn btn-sm mb-0 d-flex justify-content-center align-items-center gap-2"
          :class="`btn-outline-success bg-custom-default`"
          name="button"
          @click="store.agregarProducto(producto)"
        >
          Añadir <i class="material-icons color-success fs-5">shopping_cart</i>
        </button>
      </div>
    </div>
  </div>
  <!-- End Card Raised Header -->
</template>

<style scoped>
.card-custom {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-custom img {
  width: 100vh;
  height: 250px;
  object-fit: cover;
}
</style>
