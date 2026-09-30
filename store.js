
import Vuex from 'vuex';
import axios from "axios";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user_type: '', // Initially empty, should be set based on user type (e.g., 'teacher' or 'student')
        user_name: '',
    },
    mutations: {
        setUserType(state, user_type) {
            state.user_type = user_type;
        },
        setUserInfo(state, user_name) {
            state.user_name = user_name;
        },
    },
    getters: {
        currentUserType: state => state.user_type,
        currentUserInfo: state => state.user_name,
    },
    actions: {
        fetchUserType({commit}) {
            try {
                const response = axios.post('/api/login');
                const user_type = response.data.userInfo.userType; // Extract userType from response data
                commit('setUserType', user_type); // Commit userType to Vuex store mutation
            } catch (error) {
                // Handle error here
                console.error('Error fetching user type:', error);
            }
        },
        fetchUserInfo({commit}) {
            try {
                const response = axios.post('/api/login');
                const user_name = response.data.userInfo.userName; // Extract username from response data
                commit('setUserInfo', user_name); // Commit userType to Vuex store mutation
            } catch (error) {
                // Handle error here
                console.error('Error fetching user type:', error);
            }
        }
    }
});

