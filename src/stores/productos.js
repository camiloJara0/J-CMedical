import { defineStore } from "pinia";
import { traerProductos } from "../core/Productos/GetProductos";
import { traerCategorias } from "../core/Categorias/GetCategorias";

export const useProductosStore = defineStore("productos", {
    state: () => ({
        loading: false,
        error: false,
        productos: [],
        categorias: [],
        categoriaSeleccionada: 0,
        busqueda: '',
        orden: 'asc',
    }),

    getters: {
        productosFiltrados(state) {
            return state.productos.filter((p) => {
                const coincideCategoria = !state.categoriaSeleccionada || p.categoria_id === state.categoriaSeleccionada;
                const coincideBusqueda = p.nombre.toLowerCase().includes(state.busqueda.toLowerCase());
                return coincideCategoria && coincideBusqueda;
            });
        },

        buscandoProductos(state) {
            return state.productos.filter((p) => {
                return p.nombre.toLowerCase().includes(state.busqueda.toLowerCase());
            });
        }
    },

    actions: {
        async llamaDatos() {
            try {
                this.loading = true
                this.error = null
                const [productosData, categoriasData] = await Promise.all([
                    traerProductos(),
                    traerCategorias()
                ])
                this.productos = productosData || []
                this.categorias = categoriasData || []
            } catch (err) {
                this.error = err.message || 'Error al cargar los datos. Por favor intenta nuevamente.'
                this.productos = []
                this.categorias = []
            } finally {
                this.loading = false
            }
        },

        seleccionarCategoria(categoriaId) {
            this.categoriaSeleccionada = categoriaId
        },

        ordenar() {
            if (this.orden === 'asc') {
                this.productos.sort((a, b) => a.nombre.localeCompare(b.nombre))
                this.orden = 'desc'
            } else {
                this.productos.sort((a, b) => b.nombre.localeCompare(a.nombre))
                this.orden = 'asc'
            }
        },

        borrarFiltros() {
            this.categoriaSeleccionada = 0
            this.busqueda = ''
            this.orden = 'asc'
            this.productos.sort((a, b) => a.nombre.localeCompare(b.nombre))
        }

    }
});
