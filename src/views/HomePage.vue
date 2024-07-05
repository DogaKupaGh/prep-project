<template>
  <div class="home-page">
    <div class="filter-container d-flex align-items-center mb-4">
      <input type="text" v-model="searchText" placeholder="Search..." class="form-control mr-3">
      <select v-model="selectedCategory" @change="filterProducts" class="form-control">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
    </div>

    <div class="product-container bg-white p-4 rounded">
      <div class="product-list row row-cols-2 row-cols-md-4 g-4">
        <router-link v-for="product in filteredProducts" :key="product.id" :to="'/details/' + product.id" class="col product-link">
          <div class="product-box border p-3 position-relative shadow-sm">
            <div class="product-info">
              <h3 class="mb-1">{{ product.title }}</h3>
              <p class="mb-1"><strong>Price:</strong> ${{ product.price }}</p> 
              <button @click.prevent="addToCart(product)" class="btn btn-primary cart-button">
                <i class="fas fa-cart-plus"></i> 
                Add to Cart
              </button>
            </div>
            <img :src="product.image" alt="Product Image" class="product-image img-fluid mt-3">
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useCartStore } from '@/store/Cart';

export default {
  name: 'HomePage',
  setup() {
    const products = ref([]);
    const cartStore = useCartStore();

    const searchText = ref('');
    const selectedCategory = ref('');
    const categories = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        products.value = response.data;
        extractCategories();
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    });

    const extractCategories = () => {
      categories.value = [...new Set(products.value.map(product => product.category))];
    };

    const addToCart = (product) => {
      cartStore.addToCart(product);
      alert(`${product.title} added to cart!`);
    };

    const filteredProducts = computed(() => {
      let filtered = products.value;

      if (searchText.value) {
        const search = searchText.value.trim().toLowerCase();
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(search)
        );
      }

      if (selectedCategory.value) {
        filtered = filtered.filter(product =>
          product.category === selectedCategory.value
        );
      }

      return filtered;
    });

    const filterProducts = () => {
    };

    return {
      products,
      filteredProducts,
      addToCart,
      searchText,
      selectedCategory,
      categories,
      filterProducts,
    };
  },
};
</script>

<style scoped>
.home-page {
  background-color: darkgreen;
  color: white;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 100%;
  height: auto;
  display: block;
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}

.cart-button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
}

.cart-button:hover {
  background-color: #0056b3;
}

.cart-button i {
  margin-right: 5px;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

p {
  font-size: 1rem;
  margin-bottom: 5px;
}
</style>
