import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import token from './modules/token'

Vue.use(Vuex);

const dataState = new createPersistedState({
  paths: ['token', 'currentPost']
})

export default new Vuex.Store({
    modules: {
        token
    },
    plugins: [dataState]
});