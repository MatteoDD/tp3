import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'

async function getUserById (userId) {
  try {
    const response = await requestInterceptor.get(`${API}/users/${userId}`)
    return response.data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

// async function getUserAuth (user) {
//   try {
//     console.log('getUserById')
//     const response = await requestInterceptor.post(`${API}/api/login`, user)
//     return response.data
//   } catch (error) {
//     throw parseAxiosErrorToAppError(error)
//   }
// }

async function setUser (user) {
  try {
    const response = await requestInterceptor.post(`${API}/api/register`, user)
    return response.data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

export const userService = {
  getUserById,
  setUser
  // getUserAuth
}
