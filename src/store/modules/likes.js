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
  },
  async getLikes (state, id) {
    state.likes = await userService.getLikes(id)
  },
  async sendLike (state) {
    try {
      await userService.sendLike(state.likeToAdd)
    } catch (error) {
      state.onError = true
    }
  },
  setProfileId (state, profileId) {
    state.profileId = profileId
  },
  setOnError (state, onError) {
    state.onError = onError
  },
  async deleteLike (state, trailId) {
    let likeToDeleteTemp = {}
    state.likes.forEach(like => {
      if (like.trailId === trailId) {
        likeToDeleteTemp = like
      }
    })
    const likeToDelete =
    {
      likeId: likeToDeleteTemp.id,
      userId: state.profileId
    }
    await userService.deleteLike(likeToDelete)
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
  deleteLike ({ commit }, trailId) {
    try {
      commit('deleteLike', trailId)
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
