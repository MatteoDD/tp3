import trailService from '@/services/trailService.js'

const state = {
  parkList: [],
  trailList: [],
  selectedPark: {},
  selectedTrail: {},
  segments: [],
  segmentList: []
}

const getters = {
  getParkList (state) {
    return state.parkList
  },
  getTrailList (state) {
    return state.trailList
  },
  getSelectPark (state) {
    return state.selectedPark
  },
  getSelectTrail (state) {
    return state.selectedTrail
  },
  getSegments (state) {
    return state.segments
  },
  getSegmentList (state) {
    return state.segmentList
  }
}

const mutations = {
  async buildParkList (state) {
    state.parkList = await trailService.getParks()
  },
  async buildTrailList (state) {
    state.trailList = await trailService.getTrails()
  },
  STORE_PARK (state, park) {
    state.selectedPark = park
  },
  STORE_TRAIL (state, trail) {
    state.selectedTrail = trail
  },
  STORE_SEGMENTS (state, segments) {
    state.segments = segments
  },
  STORE_SEGLIST (state, list) {
    console.log('MUTATEUR' + list)
    state.segmentList = list
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
  async setTrail ({ commit }, id) {
    try {
      const trail = await trailService.getTrailsId(id)
      const segmentsList = await trailService.getAllSegments(trail.segments)
      console.log(trail.segments)
      console.log(segmentsList)
      commit('STORE_TRAIL', trail)
      commit('STORE_SEGMENTS', trail.segments)
      commit('STORE_SEGLIST', segmentsList)
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
