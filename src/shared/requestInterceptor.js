import axios from "axios"
import store from "../store/index"

const requestInterceptor = axios.create({})

requestInterceptor.interceptors.request.use(request => {
    if (store.getters['authentification/isLoggedIn']) {
        request.headers.Authorization = `Bearer ${store.state.authentification.token}`
    }
    return request
})

export default requestInterceptor