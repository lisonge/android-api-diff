import 'normalize.css';
import 'uno.css';
import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

document.documentElement.classList.add('hidden-scrollbar');
const app = createApp(App);
app.use(router);
app.mount('#app');
