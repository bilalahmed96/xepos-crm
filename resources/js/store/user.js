import Axios from "../api";

export default {
    namespaced: true,
    state: {
        user: null,
        token: null,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_LOGOUT(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    actions: {
        async sanctumCSRF({ commit }) {
            await Axios.get('sanctum/csrf-cookie')
        },

        async login({ commit, dispatch }, data) {
            try {
                dispatch('sanctumCSRF');
                console.log(data);
                let response = await Axios.post('login', data);
                commit('SET_TOKEN', response.data.token);
                commit('SET_USER', response.data.user);
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    throw error.response;
                }
                return { error: "There was an error. Please try again." }
            }
        },
        async logout({ commit }) {
            try {
                console.log("asdasdasd");

                await Axios.post('logout');
                commit('SET_LOGOUT');
            } catch (error) {
                return { error: "There was an error. Please try again." }
            }
        }
    },
    getters: {
        isAuth: (state) => !!state.token || !!localStorage.getItem('token'),
    },

}