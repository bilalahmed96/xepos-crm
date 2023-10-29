import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Import your store modules
import UserStore from './user';
import CompaniesStore from './companies';
import EmployeesStore from './employees';

const store = new Vuex.Store({
    modules: {
        user: UserStore,
        companies: CompaniesStore,
        employees: EmployeesStore
    },
});

export default store;
