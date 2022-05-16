import { userService } from '../../services/userService'

const state = {
  profileId: '',
  likes: [],
  likeToAdd: {},
  onError: false
}

const getters = {
  getError (state) {
    return state.onError
  },
  getLikes (state) {
    return state.likes
  }
}

const mutations = {
  setLike (state, like) {
    state.likeToAdd = like
    state.trailId = like.trailId
  },
  async getLikes (state, id) {
    state.likes = await userService.getLikes(id)
  },
  async sendLike (state) {
    await userService.sendLike(state.likeToAdd)
  },
  setProfileId (state, profileId) {
    state.profileId = profileId
  },
  setOnError (state, onError) {
    state.onError = onError
  }
}

const actions = {
  like ({ commit }, like) {
    try {
      commit('setLike', like)
      commit('sendLike')
    } catch (error) {
      commit('setOnError', true)
    }
  },
  deleteLike ({ commit }) {
    try {
      commit('setProfileId', '')
    } catch (error) {
      commit('setOnError', true)
    }
  },
  initializeLikes ({ commit }, profileId) {
    if (profileId !== '') {
      commit('setProfileId', profileId)
      commit('getLikes', profileId)
    } else {
      commit('setOnError', true)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
