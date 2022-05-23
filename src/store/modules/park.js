import trailService from '@/services/trailService.js'

const state = {
  parkList: [],
  trailList: [],
  selectedPark: {},
  selectedTrail: {},
  segments: [],
  segmentList: [],
  nbLikesAssociated: [],
  onError: false
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
  },
  getNbLikesAssociated (state) {
    return state.nbLikesAssociated.length
  }
}

const mutations = {
  async buildParkList (state, list) {
    state.parkList = list
  },
  async buildTrailList (state, t) {
    state.trailList = t
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
    state.segmentList = list
  },
  async COMPUTE_LIKES_ASSOCIATED (state) {
    state.nbLikesAssociated = await trailService.getNbLikesAssociated(state.selectedTrail.id)
  },
  setOnError (state) {
    state.onError = true
  }
}

const actions = {
  async initializeParks ({ commit }) {
    try {
      const list = await trailService.getParks()
      commit('buildParkList', list)
    } catch (error) {
      commit('setOnError')
    }
  },
  async initializeTrails ({ commit }) {
    try {
      const list = await trailService.getTrails()
      commit('buildTrailList', list)
    } catch (error) {
      commit('setOnError')
    }
  },
  setPark ({ commit }, park) {
    commit('STORE_PARK', park)
  },
  async setTrail ({ commit }, id) {
    try {
      const trail = await trailService.getTrailsId(id)
      const segmentsList = await trailService.getAllSegments(trail.segments)
      commit('STORE_TRAIL', trail)
      commit('STORE_SEGMENTS', trail.segments)
      commit('STORE_SEGLIST', segmentsList)
    } catch (error) {
      commit('setOnError')
    }
  },
  getLikesAssociated ({ commit }) {
    try {
      commit('COMPUTE_LIKES_ASSOCIATED')
    } catch (error) {
      commit('setOnError')
    }
  },
  resetPark ({ commit }) {
    commit('STORE_PARK', {})
    commit('STORE_TRAIL', {})
    commit('STORE_SEGMENTS', {})
    commit('STORE_SEGLIST', {})
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
