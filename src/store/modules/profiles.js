import { userService } from '@/services/userService'

const state = {
  profile: {},
  onError: false,
  accountId: 0
}

const getters = {
  getProfile: state => {
    return state.profile
  },
  getAccountId: state => {
    return state.accountId
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
  },
  accountId (state, id) {
    state.accountId = id
  },
  async remouveCurrentUser (state) {
    state.profile = {}
  }
}

const actions = {
  async getProfile ({ commit, rootGetters }) {
    try {
      const userId = rootGetters['authentication/getTokenUserId']
      const profile = await userService.getUserById(userId)
      commit('profileSetup', profile)
      commit('accountId', userId)
    } catch (error) {
      commit('setOnError')
    }
  },
  async createProfile ({ commit }, profile) {
    await commit('initializeProfileTry', profile)
  },
  async resetProfile ({ commit }) {
    commit('remouveCurrentUser')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
