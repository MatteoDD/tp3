import trailService from '@/services/trailService.js'

const state = {
  parkList: [],
  trailList: [],
  selectedPark: {},
  selectedTrail: {},
  segments: []
}

const getters = {
  getParkList (state) {
    return state.parkList
  },
  getTrailList (state) {
    return state.trailList
  },
  getSegments (state) {
    return state.selectedTrail.segments
  },
  getSelectPark (state) {
    return state.selectedPark
  },
  getSelectTrail (state) {
    return state.selectedTrail
  }
}

const mutations = {
  async buildParkList (state) {
    state.parkList = await trailService.getParks()
  },
  async buildTrailList (state) {
    state.trailList = await trailService.getTrails()
  },
  async addSegment (state, id) {
    state.segments.push(await trailService.getSegment(id))
  },
  STORE_PARK (state, park) {
    state.selectedPark = park
  },
  STORE_TRAIL (state, trail) {
    state.selectedTrail = trail
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
  },
  setPark ({ commit }, park) {
    commit('STORE_PARK', park)
  },
  setTrail ({ commit }, trail) {
    commit('STORE_TRAIL', trail)
  },
  fetchSegment ({ commit }) {
    try {
      commit('addSegment')
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
