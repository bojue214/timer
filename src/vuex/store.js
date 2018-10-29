import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules: {
        user
    }
});

export default store;