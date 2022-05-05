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

async function setUser (profile) {
  try {
    const response = await requestInterceptor.put(profile)
    return response.data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

export const userService = {
  getUserById,
  setUser
}
