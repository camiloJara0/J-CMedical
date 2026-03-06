<script setup>
import { useAppStore } from '../../../../stores';
import { watch } from 'vue';

defineProps({
  color: {
    type: String,
    default: "success",
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
  fontWeight: {
    type: String,
    default: "",
  },
});

const store = useAppStore()

function getClasses(color, dismissible, fontWeight) {
  let colorValue, dismissibleValue, fontWeightValue;

  colorValue = color && `alert-${color}`;

  dismissibleValue = dismissible ? "alert-dismissible fade show" : "";

  fontWeightValue = fontWeight ? `font-weight-${fontWeight}` : "";

  return `${colorValue} ${dismissibleValue} ${fontWeightValue}`;
}

function cerrarAlert() {
  store.showAlert = false
}
</script>
<template>
  <div  class="alert alert-dismissible fade show text-white shadow-dark d-flex align-items-center justify-content-center px-5 py-2" role="alert" style="height: fit-content;"
    :class="getClasses(color, dismissible, fontWeight)">

    <slot />
    <button v-if="dismissible" type="button" class="btn-close text-lg opacity-10 p-2 m-0" aria-label="Close"
      @click="cerrarAlert">
      <i aria-hidden="true" class="material-icons">close</i>
    </button>
  </div>

</template>
