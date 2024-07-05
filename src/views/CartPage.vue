<template>
  <div class="cart-page container-fluid">
    <div class="row">
      <div class="col-12 text-end mb-3">
        <p class="total fw-bold"><strong>Total:</strong> ${{ total }}</p>
      </div>
      <div class="col-12">
        <ul class="list-group">
          <li v-for="item in cartItems" :key="item.id" class="list-group-item d-flex align-items-center bg-white text-dark">
            <div class="me-3">
              <img :src="item.image" alt="Product Image" class="product-image img-thumbnail">
            </div>
            <div class="item-details flex-grow-1">
              <h5>{{ item.title }}</h5>
              <p class="mb-1"><strong>Price:</strong> ${{ item.price }}</p>
              <p class="mb-1"><strong>Rating:</strong> {{ formatRating(item.rating) }}</p>
              <p class="mb-1"><strong>Individual Price:</strong> ${{ item.price }}</p>
            </div>
            <button @click="removeFromCart(item)" class="btn btn-danger ms-auto">Remove</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="d-flex justify-content-between mt-4">
      <button @click="clearCart" class="btn btn-warning">Clear Cart</button>
      <button @click="purchase" class="btn btn-success">Purchase</button>
    </div>
    <p v-if="purchasedMessage" class="alert alert-success mt-3">{{ purchasedMessage }}</p>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useCartStore } from '@/store/Cart';

export default defineComponent({
  name: 'CartPage',
  setup() {
    const cartStore = useCartStore();

    onMounted(() => {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
      if (storedCartItems) {
        cartStore.setCart(storedCartItems);
      }
    });

    const cartItems = computed(() => cartStore.cart);
    const total = computed(() => {
      return cartStore.cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    });

    const purchasedMessage = ref('');

    const removeFromCart = (product) => {
      cartStore.removeFromCart(product);
      updateLocalStorage();
    };

    const clearCart = () => {
      cartStore.clearCart();
      updateLocalStorage(); 
      purchasedMessage.value = 'Cart cleared!';
      setTimeout(() => {
        purchasedMessage.value = '';
      }, 3000);
    };

    const purchase = () => {
      cartStore.clearCart();
      updateLocalStorage(); 
      purchasedMessage.value = 'Purchase successful!';
      setTimeout(() => {
        purchasedMessage.value = '';
      }, 3000);
    };

    const updateLocalStorage = () => {
      localStorage.setItem('cartItems', JSON.stringify(cartStore.cart));
    };

    const formatRating = (rating) => {
      return `${rating.rate} (${rating.count} Reviews)`;
    };

    return {
      cartItems,
      total,
      removeFromCart,
      clearCart,
      purchase,
      formatRating,
      purchasedMessage,
    };
  },
});
</script>

<style scoped>
.cart-page {
  background-color: darkgreen;
  color: white;
  min-height: 100vh; 
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image {
  width: 100px;
  height: auto;
}

.total {
  font-size: 1.2rem;
}

.list-group-item {
  background-color: white; 
  color: black; 
}

.alert-success {
  color: white;
  background-color: #28a745;
  border-color: #28a745;
}
</style>
