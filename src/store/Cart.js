import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(product) {
      this.cart.push(product);
      this.updateLocalStorage();
    },
    removeFromCart(product) {
      const index = this.cart.findIndex(item => item.id === product.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.updateLocalStorage();
      }
    },
    clearCart() {
      this.cart = [];
      this.updateLocalStorage();
    },
    setCart(products) {
      this.cart = products;
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cart));
    }
  },
});
