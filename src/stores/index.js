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
    carrito: []
  }),

  actions: {
    async agregarProducto(producto) {
      this.carrito.push(producto)
      await this.mostrarAlerta('Nuevo producto añadido', 'success')
      console.log(this.carrito)
    },

    eliminarProducto(producto) {
      this.carrito = this.carrito.filter(p => {
        return p.id !== producto.id
      })
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
