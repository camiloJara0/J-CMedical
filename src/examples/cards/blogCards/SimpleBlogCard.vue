<script setup>
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
});
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
      <button
        class="btn btn-sm mb-0"
        :class="`btn-outline-${action.color} bg-custom-default`"
        name="button"
        @click="action.action(title)"
      >
        Mas Informacion
      </button>
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
