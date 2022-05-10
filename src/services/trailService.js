import { API } from '@/shared/config'
import axios from 'axios'

async function getTrails () {
  const response = await axios.get(`${API}/trails`)
  return response.data
}

async function getParks () {
  const response = await axios.get(`${API}/parks`)
  return response.data
}

export default {
  getTrails,
  getParks
}
