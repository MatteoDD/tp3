<template>
  <div>
    <div class="container">
      <div class="Park form-group col-lg-2">
         <select style="width: 150px" onchange="onChangePark(this.value)" class="custom-select center" id="listPark" v-model="selectedPark">
            <option v-for="park in parks" :key="park.id" :value="park">
              {{ park.name }}</option
            >
          </select>
          <select style="width:150px" onchange="onChangePark(this.value)" class="custom-select center" id="listTrail">
            <option v-for="trail in filteredList" :key="trail.id" :value="trail">
              {{ trail.name }}</option
            >
          </select>
      </div>
      <div class="Map center"></div>
      <div class="Like"> <l-map style=" width: 600px; height:300px" :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="markerLatLng"></l-marker>
          </l-map></div>
        <div class="Trail center">
        </div>
      </div>
  </div>
</template>

<script>
import { trailService } from '../services/trailService.js'

export default {
  async created () {
    this.parks = []
    this.trails = []
    try {
      this.parks = await trailService.getParks()
      this.trails = await trailService.getTrails()
    } catch {}
  },
  data () {
    return {
      parks: [],
      trails: [],
      selectedPark: [],
      selectedTrail: [],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15
    }
  },
  methods: {
    onChangePark (event) {
      this.selectedPark = event.target.value
    },
    onChangeTrail (event) {
      this.selectedTrail = event.target.value
    }
  },
  computed: {
    filteredList: function () {
      return this.trails.filter(x => x.parkId === this.selectedPark.id)
    }
  }
}
</script>

<style lang="css" scoped>
.container {  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "Park Like"
    "Trail Map";
}

.Park {
  grid-area: Park;
  margin-top: 20px;
}

.Trail { grid-area: Trail;
display: flex;
  justify-content: space-between; }

.Like { grid-area: Like; }

.Map { grid-area: Map;
align-content: center;}
</style>
