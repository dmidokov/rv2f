import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import {register} from "./js/CustomElements";

const app = createApp(App)
    .use(router)
    .mount('#app')

register()