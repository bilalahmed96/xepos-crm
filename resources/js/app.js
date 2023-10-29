import Vue from 'vue'; // Import Vue
import BootstrapVue from 'bootstrap-vue'; // Import BootstrapVue
import router from './router'; // Import Router 
import VeeValidate from 'vee-validate';
import store from "./store/store.js";
import ToastPlugin from 'vue-toast-notification';

import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import 'bootstrap-vue/dist/bootstrap-vue.css'; // Import BootstrapVue CSS
import 'vue-toast-notification/dist/theme-bootstrap.css';

import app from './components/app.vue';

// Use Vue and BootstrapVue
Vue.use(BootstrapVue);

// Use VeeValidate
Vue.use(VeeValidate);

// Use Toast 
Vue.use(ToastPlugin);

// Create a Vue instance and mount it
new Vue({
    el: '#app', // Specify the HTML element to mount to
    store, // Add the State management into the APP
    router, // Attach the router to your Vue instance
    render: (h) => h(app), // Render your app component
});
