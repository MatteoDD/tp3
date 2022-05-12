import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'

async function getToken (credential) {
  try {
    const response = await requestInterceptor.post(`${API}/api/login`, {
      email: credential.email,
      password: credential.password
    })
    const token = response.data.accessToken
    return token
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

async function register (profile) {
  try {
    const response = await requestInterceptor.post(`${API}/api/register`, {
      email: profile.email,
      password: profile.password,
      name: profile.name
    })
    const token = response.data.accessToken
    return token
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

export const authService = {
  getToken,
  register
}
