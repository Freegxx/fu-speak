import Vue from 'vue'
import Vuex from 'vuex'
import word from './modules/word'
import speaking from './modules/speaking'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    word,
    speaking,
    user
  },
  actions: {
    initLocalData({ dispatch }) {
      dispatch('word/loadLocalData')
      dispatch('speaking/loadLocalData')
      dispatch('user/loadLocalData')
    }
  }
})
