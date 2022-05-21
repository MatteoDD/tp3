import { userService } from '../../services/userService'

const state = {
  profileId: '',
  likes: [],
  likeToAdd: {},
  onError: false,
  addedLike: {}
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
  async getLikes (state, likes) {
    state.likes = likes
  },
  async sendLike (state, like) {
    try {
      await userService.sendLike(state.likeToAdd)
      state.addedLike = like
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
      commit('sendLike', Object) // On envoie un objet vide pour faciliter les tests
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
  async initializeLikes ({ commit }, profileId) {
    if (profileId !== '') {
      commit('setProfileId', profileId)
      const likes = await userService.getLikes(profileId)
      commit('getLikes', likes)
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
