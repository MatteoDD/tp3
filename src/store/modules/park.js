import trailService from '@/services/trailService.js'

const state = {
  parkList: [],
  trailList: [],
  selectedPark: {}
}

const getters = {
  getParkList (state) {
    return state.parkList
  },
  getTrailList (state) {
    return state.trailList
  }
}

const mutations = {
  async buildParkList (state) {
    state.parkList = await trailService.getParks()
  },
  async buildTrailList (state) {
    state.trailList = await trailService.getTrails()
  }
}

const actions = {
  initializeParks ({ commit }) {
    try {
      commit('buildParkList')
    } catch {}
  },
  initializeTrails ({ commit }) {
    try {
      commit('buildTrailList')
    } catch {}
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
