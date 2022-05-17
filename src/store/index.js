import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
import profiles from './modules/profiles'
import park from './modules/park'
import likes from './modules/likes'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => ({
    authentication: {
      token: state.authentication.token
    }
  })
})

export default new Vuex.Store({
  modules: {
    authentication,
    profiles,
    park,
    likes
  },
  plugins: [vuexLocal.plugin]
})
