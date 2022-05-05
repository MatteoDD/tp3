import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'

async function getToken () {
  try {
    const response = await requestInterceptor.get(`${API}/login`, {
      email: 'email',
      password: 'password'
    })
    const token = response.data.token
    return token
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

export const authService = {
  getToken
}
