import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JavaScript
import '@fortawesome/fontawesome-free/css/all.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assuming you have a router setup in './router'
import { createPinia } from 'pinia'; // Import Pinia

const app = createApp(App);

app
  .use(createPinia()) // Use Pinia for state management
  .use(router) // Use Vue Router
  .mount('#app');
