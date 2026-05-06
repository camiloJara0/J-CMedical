import { defineStore } from "pinia";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
export const useAppStore = defineStore("storeId", {
  state: () => ({
    bootstrap,
    showModal: false,
    informacion: {},
    showAlert: false,
    cargando: false,
    alert: {},
    carrito: [],
    cotizar: true,
  }),

  actions: {
    agregarProducto(producto) {
      this.carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : []
      this.carrito.push(producto)
      this.showModal = false
      localStorage.setItem('carrito', JSON.stringify(this.carrito))
      this.mostrarAlerta('Nuevo producto añadido', 'success')
    },

    eliminarProducto(producto) {
      this.carrito = this.carrito.filter(p => {
        return p.id !== producto.id
      })
      localStorage.setItem('carrito', JSON.stringify(this.carrito))
    },

    mostrarAlerta(texto, color) {
      this.alert.texto = texto;
      this.alert.color = color;
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 1200); // ⏱️ 1,2 segundos para que el usuario lo lea
    }
  }
});
