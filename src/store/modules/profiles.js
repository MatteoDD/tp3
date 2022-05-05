import {userService} from '../services/userService.js'

const state = {
    email: '',
    name: '',
    onError: false
}

const getters = {}

const mutations = {
    initialize(state, payload) {
        state.email = payload.email
        state.name = payload.name
        state.onError = false
    },
    setOnError(state) {
        state.onError = true
    }
}

