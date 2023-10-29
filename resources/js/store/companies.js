import Axios from "../api";

export default {
    namespaced: true,
    state: {
        companies: null,
    },
    mutations: {
        SET_COMPANIES(state, payload) {
            state.companies = payload
        },
    },
    actions: {
        async getAllCompanies({ commit }) {
            try {
                let response = await Axios.get('companies/all')
                commit('SET_COMPANIES', response.data.companies);
            } catch (error) {
                return { error: "There was an error. Please try again." }
            }
        },

        async getCompanies({ commit }, page) {
            try {
                let response = await Axios.get('companies?page=' + page)
                return response.data.companies;
            } catch (error) {
                return { error: "There was an error. Please try again." }
            }
        },
        async addCompany({ commit }, data) {
            try {
                let response = await Axios.post('companies', data);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    throw error.response;
                }
                return { error: "There was an error. Please try again." }
            }
        },
        async updateCompany({ commit }, { companyId, data }) {
            try {
                let response = await Axios.post(`companies/${companyId}`, data);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    throw error.response;
                }
                return { error: "There was an error. Please try again." }
            }
        },
        async removeCompany({ commit }, { companyId }) {
            try {
                let response = await Axios.delete(`companies/${companyId}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    },
    getters: {},

}