<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits(['update:currentPage', 'update:itemsPerPage'])

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const rangeStart = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.itemsPerPage + 1
})

const rangeEnd = computed(() => {
  return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})

const pageRange = computed(() => {
  const pages = []
  const maxPagesToShow = 5
  let startPage = Math.max(1, props.currentPage - Math.floor(maxPagesToShow / 2))
  let endPage = Math.min(totalPages.value, startPage + maxPagesToShow - 1)

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})

function goToPage(page) {
  if (page > 0 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}

function changeItemsPerPage(event) {
const newValue = event.target.value
console.log(newValue)
  emit('update:itemsPerPage', parseInt(newValue))
  emit('update:currentPage', 1)
}

function goToPrevious() {
  goToPage(props.currentPage - 1)
}

function goToNext() {
  goToPage(props.currentPage + 1)
}
</script>

<template>
  <div class="pagination-container">
    <div class="pagination-info">
      <div class="items-per-page">
        <label class="form-label mb-0 me-2">Mostrar:</label>
        <select
          :value="itemsPerPage"
          @change="changeItemsPerPage"
          class="form-select form-select-sm px-3"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      <div class="pagination-stats">
        <span class="text-muted">
          Mostrando
          <strong>{{ rangeStart }}</strong>
          a
          <strong>{{ rangeEnd }}</strong>
          de
          <strong>{{ totalItems }}</strong>
        </span>
      </div>
    </div>

    <nav class="pagination-nav" aria-label="Page navigation">
      <ul class="pagination mb-0">
        <!-- Botón anterior -->
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            @click="goToPrevious"
            :disabled="currentPage === 1"
            class="page-link page-link-circle"
            aria-label="Página anterior"
            title="Anterior"
          >
            <i class="material-icons">chevron_left</i>
          </button>
        </li>

        <!-- Primera página (si no está en el rango) -->
        <li v-if="pageRange[0] > 1" class="page-item disabled">
          <span class="page-link">...</span>
        </li>

        <li
          class="page-item active"
        >
          <button class="page-link">
            {{ currentPage }}
          </button>
        </li>

        <!-- Última página (si no está en el rango) -->
        <li v-if="pageRange[pageRange.length - 1] < totalPages" class="page-item disabled">
          <span class="page-link">...</span>
        </li>

        <!-- Botón siguiente -->
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            @click="goToNext"
            :disabled="currentPage === totalPages"
            class="page-link page-link-circle"
            aria-label="Página siguiente"
            title="Siguiente"
          >
            <i class="material-icons">chevron_right</i>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.pagination-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.items-per-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-select-sm {
  width: auto;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.pagination-stats {
  text-align: end;
}

.pagination-nav {
  display: flex;
  justify-content: center;
}

.pagination {
  display: flex;
  gap: 2rem;
}

.page-item {
  list-style: none;
}

.page-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.page-link-circle {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  gap: 0;
}

.page-link:hover:not(.disabled .page-link) {
  background-color: #e9ecef;
  border-color: #adb5bd;
  color: #000;
  transform: translateY(-2px);
}

.page-link-circle:hover:not(.disabled .page-link) {
  transform: scale(1.1);
}

.page-item.active .page-link {
  background-color: #333;
  border-color: #333;
  color: white;
  font-weight: 600;
}

.page-item.disabled .page-link {
  background-color: #f8f9fa;
  border-color: #dee2e6;
  color: #6c757d;
  cursor: not-allowed;
  opacity: 0.5;
}

.page-link i {
  font-size: 1.1rem;
}

.page-link-circle i {
  font-size: 1.3rem;
}

@media (max-width: 768px) {
  .pagination-container {
    padding: 1rem;
    gap: 1rem;
  }

  .pagination-info {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .pagination-stats {
    text-align: start;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.125rem;
  }

  .page-link {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
  }

  .page-link i {
    font-size: 0.9rem;
  }

  .page-link-circle {
    width: 36px;
    height: 36px;
  }
}
</style>
