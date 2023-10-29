import Vue from 'vue';
import VueRouter from 'vue-router';

// Import your Vue components for routing
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Employees from './components/employees';
import Companies from './components/companies';

Vue.use(VueRouter);

const routes = [
    { path: '/login', component: Login, name: 'login', },
    { path: '/', component: Home, name: 'home', meta: { requiresAuth: true } },
    { path: '/employees', component: Employees, name: 'employees', meta: { requiresAuth: true } },
    { path: '/companies', component: Companies, name: 'companies', meta: { requiresAuth: true } },

];



const router = new VueRouter({
    mode: 'history', // Use HTML5 history mode (remove # from URLs)
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.meta.requiresAuth && !token) {
        // Redirect to the login page if the route requires authentication
        next('/login');
    } else if (to.meta.requiresGuest && token) {
        // Redirect to a different route if the user is already authenticated
        next('/');
    } else {
        // Proceed to the route
        next();
    }
});

export default router;
