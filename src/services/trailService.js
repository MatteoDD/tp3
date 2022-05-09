import axios from 'axios'

async function getTrails () {
  const response = await axios.get('https://tp3-api.herokuapp.com/trails')
  return response.data
}

async function getParks () {
  const response = await axios.get('https://tp3-api.herokuapp.com/parks')
  return response.data
}

export const trailService = {
  getTrails,
  getParks
}
