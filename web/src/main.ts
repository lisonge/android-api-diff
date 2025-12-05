import 'normalize.css';
import 'uno.css';
import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

document.documentElement.classList.add('hidden-scrollbar');
createApp(App)
  .use(router)
  .mount(document.body.appendChild(document.createElement('div')));
