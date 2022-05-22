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

async function sendLike (like) {
  try {
    const response = await requestInterceptor.post(`${API}/api/likes`, {
      userId: like.userId,
      trailId: like.trailId
    })
    return response.data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

async function deleteLike (like) {
  try {
    const response = await requestInterceptor.delete(`${API}/api/likes/${like.likeId}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

async function getLikes (userId) {
  try {
    const response = await requestInterceptor.get(`${API}/api/users/${userId}/likes`)
    return response.data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}
export const userService = {
  getUserById,
  setUser,
  sendLike,
  getLikes,
  deleteLike
}
