import { userService } from '@/services/userService'

const state = {
  profile: {},
  onError: false
}

const getters = {
  getProfile: state => {
    return state.profile
  }
}

const mutations = {
  initializeProfile (state, profile) {
    state.profile.push({
      email: profile.email,
      password: profile.password,
      name: profile.name,
      role: profile.role
    })
  },
  setOnError (state) {
    state.onError = true
  },
  async profileSetup (state, profileToSet) {
    state.profile = profileToSet
  }
}

const actions = {
  async getProfile ({ commit, rootGetters }) {
    try {
      const userId = rootGetters['authentication/getTokenUserId']
      const profile = await userService.getUserById(userId)
      commit('profileSetup', profile)
    } catch (error) {
      commit('setOnError')
    }
  },
  async createProfile ({ commit }, profile) {
    await commit('initializeProfileTry', profile)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
