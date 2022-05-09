import trailService from '../../services/trailService.js'
import tokenHelper from '@/shared/tokenHelper'

const state = {
parkList: [],
trailList : [],
selectedPark: 0
}

const getters = {
async getParkList() {
    try {
        parkList = await trailService.getParks()
    } 
    catch {}  
},
async getTrailList() {
    try{
        trailList = await trailService.getTrails()
    }
    catch{}
}

}
const mutations = {
}

const actions = {
  
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
