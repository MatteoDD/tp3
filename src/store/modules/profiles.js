import { userService } from '@/services/userService'

const state = {
  profile: {
    id: '',
    name: '',
    email: ''
  },
  profiles: [],
  onError: false
}

const getters = {

  getById: state => id => {
    return state.profile.find(profile => profile.id === id)
  },
  getByEmail: state => email => {
    return state.profile.find(profile => profile.email === email)
  }
}

const mutations = {
  initializeProfile (state, profile) {
    const newId = Math.max(...state.profile.map(profile => profile.id)) + 1
    state.profile.push({
      id: newId,
      email: profile.email,
      password: profile.password,
      name: profile.name,
      role: profile.role
    })
  },
  modifyProfile (state, profile) {
    const id = userService.findIndex(user => profile.id === user.id)
    state.profile[id - 1] = profile
    state.profile.push({
      id: profile.id,
      email: profile.email,
      name: profile.name,
      onError: false
    })
  },
  setOnError (state) {
    state.onError = true
  },
  testMutate (state, profile) {
    state.profile = profile
    state.profile.id = 1
  },
  // test personelle
  async initializeProfileTry (state, profile) {
    await userService.setUser(profile).then(rep => {
      console.log(rep)
      if (rep !== undefined) {
        state.profile.email = rep.user.email
        state.profile.name = rep.user.name
        state.profile.id = rep.user.id
        state.onError = false
      } else {
        // return error
      }
    })
  },
  async authTry (state, profile) {
    await userService.getUserAuth(profile).then(new Promise(resolve => setTimeout(resolve, 4000))).then(rep => {
      console.log(rep)
      if (rep !== undefined) {
        state.profile.email = rep.user.email
        state.profile.name = rep.user.name
        state.profile.id = rep.user.id
        state.onError = false
        // state.profile('setToken', rep.token)
      } else {
        // return error
      }
    })
  }
}

const actions = {
  async login ({ commit, rootGetters }) {
    try {
      // par userservice ou par getters?
      const userId = rootGetters['authentication/getTokenUserId']
      const profile = await userService.getUserById(userId)
      commit('initializeProfile', profile)
    } catch (error) {
      commit('setOnError')
    }
  },
  async modifyProfile ({ commit }, profile) {
    try {
      await userService.modifyUser(profile)
      commit('modifyProfile', profile)
    } catch (error) {
      commit('setOnError')
    }
  },

  // test personelle
  async loginV2 ({ commit }, profile) {
    try {
      // par userservice ou par getters
      commit('authTry', profile)
    } catch (error) {
      commit('setOnError')
    }
  },
  async createProfile ({ commit }, profile) {
    await commit('initializeProfileTry', profile)
  },
  setProfileToken ({ commit, rootGetters }, token) {
    rootGetters['authentication/setToken'](token)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
