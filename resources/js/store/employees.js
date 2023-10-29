import Axios from "../api";

export default {
    namespaced: true,
    state: {
        employees: null,
    },
    mutations: {
        SET_EMPLOYEES(state, payload) {
            state.employees = payload
        },
    },
    actions: {
        async getEmployees({ commit }, page) {
            try {
                let response = await Axios.get('employees?page=' + page)
                return response.data.employees;
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    throw error.response;
                }
                return { error: "There was an error. Please try again." }
            }
        },
        async addEmployee({ commit }, data) {
            try {
                let response = await Axios.post('employees', data);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    throw error.response;
                }
                return { error: "There was an error. Please try again." }
            }
        },
        async updateEmployee({ commit }, { employeeId, data }) {
            try {
                let response = await Axios.post(`employees/${employeeId}`, data);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    throw error.response;
                }
                return { error: "There was an error. Please try again." }
            }
        },
        async removeEmployee({ commit }, { employeeId }) {
            try {
                let response = await Axios.delete(`employees/${employeeId}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    },
    getters: {},

}