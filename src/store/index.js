import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert:{}
  },
  getters: {
    getAlert(state){
      return state.alert;
    }
  },
  mutations: {
    setAlert(state,item){
      state.alert = {...item};
    }
  },
})
