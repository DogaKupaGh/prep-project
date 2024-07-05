<template>
  <div v-if="product" class="details-page">
    <div class="container product-container">
      <div class="row product-info">
        <div class="col-md-6 image-container">
          <img :src="product.image" alt="Product Image" class="product-image img-fluid">
        </div>
        <div class="col-md-6 details">
          <h1>{{ product.title }}</h1>
          <p><strong>Price:</strong> ${{ product.price }}</p>
          <p><strong>Description:</strong> {{ product.description }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>Rating:</strong> {{ formatRating(product.rating) }}</p>
          <button @click="addToCart(product)" class="btn btn-primary add-to-cart-button">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center">
    <p>Loading...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/store/Cart';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  name: 'DetailsPage',
  setup() {
    const product = ref(null);
    const route = useRoute();
    const cartStore = useCartStore(); 

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${route.params.id}`);
        product.value = response.data;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    const formatRating = (rating) => {
      return `${rating.rate} (${rating.count} reviews)`;
    };

    const addToCart = (product) => {
      cartStore.addToCart(product); 
      alert('Product added to cart!');
    };

    onMounted(fetchProduct);

    return {
      product,
      formatRating,
      addToCart,
    };
  },
};
</script>

<style scoped>
.details-page {
  background-color: darkgreen; 
  color: black; 
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-container {
  background-color: white; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.product-info {
  display: flex;
}

.image-container {
  flex: 1;
}

.product-image {
  max-width: 100%;
  height: auto;
  max-height: 400px; 
  margin-bottom: 20px; 
}

.details {
  flex: 2;
}

.details h1 {
  margin-top: 0;
  font-size: 2.5rem;
}

.details p {
  margin-bottom: 10px;
}

.add-to-cart-button {
  display: flex;
  align-items: center;
}

.add-to-cart-button i {
  margin-right: 8px; 
}
</style>
