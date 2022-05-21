import { API } from '@/shared/config'
import requestInterceptor from '../shared/requestInterceptor'

async function getTrails () {
  const response = await requestInterceptor.get(`${API}/trails`)
  return response.data
}

async function getTrailsId (id) {
  const response = await requestInterceptor.get(`${API}/trails/${id}`)
  return response.data
}

async function getParks () {
  const response = await requestInterceptor.get(`${API}/parks`)
  return response.data
}

async function getSegment (id) {
  try {
    const response = await requestInterceptor.get(`${API}/segments/${id}`)
    return response.data
  } catch {}
}

async function getAllSegments (s) {
  const result = []
  s.forEach(async element => {
    result.push(await getSegment(element))
  })
  return result
}

async function getNbLikesAssociated (id) {
  try {
    const response = await requestInterceptor.get(`${API}/trails/${id}/likes`)
    return response.data
  } catch {}
}

export default {
  getTrails,
  getParks,
  getSegment,
  getTrailsId,
  getAllSegments,
  getNbLikesAssociated
}
