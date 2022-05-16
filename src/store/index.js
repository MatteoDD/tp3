import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
import profiles from './modules/profiles'
import park from './modules/park'
import likes from './modules/likes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    profiles,
    park,
    likes
  }
})
