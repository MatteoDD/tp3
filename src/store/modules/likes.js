import { userService } from '../../services/userService'

const state = {
  profileId: '',
  trailId: '',
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
  async sendLike (state) {
    console.log('sendLike')
    await userService.sendLike(state.likeToAdd)
  },
  setProfileId (state, profileId) {
    state.profileId = profileId
  },
  setOnError (state, onError) {
    state.onError = onError
  },
  async getLikes (state, id) {
    state.likes = await userService.getLikes(id)
  }
}

const actions = {
  like ({ commit }, like) {
    commit('setLike', like)
    commit('sendLike')
  },
  deleteLike ({ commit }) {
    commit('setProfileId', '')
  },
  initializeLikes ({ commit }, profileId) {
    commit('setProfileId', profileId)
    commit('getLikes', profileId)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
