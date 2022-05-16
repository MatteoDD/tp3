<template>
  <div>
    <div class="container">
      <div class="Park form-group col-lg-2">
         <select style="width: 150px" @change="onChangePark" class="custom-select center" id="listPark" v-model="selectedPark">
            <option v-for="park in fetchParkList" :key="park.id" :value="park">
              {{ park.name }}</option
            >
          </select>
          <select style="width:150px" @change="onChangeTrail" class="custom-select center" id="listTrail" v-model="selectedTrail">
            <option v-for="trail in filteredList" :key="trail.id" :value="trail">
              {{ trail.name }}</option
            >
          </select>
      </div>
      <div class="Like">
        <p>Park: {{parkSelect.name}}</p>
        <p>Trail : {{trailSelect.name}}</p>
        <l-map style=" width: 600px; height:300px" :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="markerLatLng"></l-marker>
          </l-map></div>
      <div class="Trail center">
      </div>
      </div>
      <button @click="setLikeToTrail">like temp</button>
      <button @click="deleteLikeToTrail">dislike temp</button>
  </div>
</template>

<script>
export default {
  async created () {
    this.$store.dispatch('park/initializeParks')
    this.$store.dispatch('park/initializeTrails')
  },
  data () {
    return {
      trailSelect: '',
      parkSelect: '',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      segmentsList: []
    }
  },
  methods: {
    onChangePark () {
      if (this.isLogedIn) {
        // voir like dans devtool
        this.$store.dispatch('likes/initializeLikes', this.profileId)
      }
    },
    async onChangeTrail () {
      if (this.isLogedIn) {
        // voir like dans devtool
        this.$store.dispatch('likes/initializeLikes', this.profileId)
      }
    },
    setLikeToTrail () {
      if (this.isLogedIn) {
        setTimeout(() => {
          this.refreshLikes()
        }, 1115)
        this.$store.dispatch('likes/like', this.newLike)
      }
    },
    deleteLikeToTrail () {
      if (this.isLogedIn) {
        for (let i = 0; i < parseInt(this.nbOfLikeInProfile); i++) {
          if (this.selectedTrail.id === this.likesInProfile[i].trailId) {
            this.$store.dispatch('likes/deleteLike', this.newLike)
          }
        }
        this.$store.dispatch('likes/deleteLike', this.selectedTrail.id).then(() => {
          this.refreshLikes()
        })
      }
    },
    refreshLikes () {
      this.$store.dispatch('likes/initializeLikes', this.profileId)
    }
  },

  computed: {
    filteredList: function () {
      return this.$store.getters['park/getTrailList'].filter(x => x.parkId === this.parkSelect.id)
    },
    fetchParkList: function () {
      return this.$store.getters['park/getParkList']
    },
    isLogedIn: function () {
      return this.$store.getters['authentication/isLoggedIn']
    },
    profileId: function () {
      return this.$store.getters['profiles/getAccountId']
    },
    newLike: function () {
      const newLike = {
        userId: this.$store.getters['profiles/getAccountId'],
        trailId: this.selectedTrail.id + ''
      }
      return newLike
    },
    likesInProfile: function () {
      return this.$store.getters['likes/getLikes']
    },
    nbOfLikeInProfile: function () {
      return this.likesInProfile.length
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
