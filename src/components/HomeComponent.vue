<template>
  <div>
    <div class="container">
      <div class="Park form-group col-lg-3">
         <select style="width: 150px" class="custom-select center" id="listPark" @change="onChangePark($event)" v-model="parkSelect">
            <option v-for="park in fetchParkList" :key="park.id" :value="park">
              {{ park.name }}</option
            >
          </select>
          <select style="width:150px" class="custom-select center" id="listTrail" @change="onChangeTrail($event)" v-model="trailSelect">
            <option v-for="trail in filteredList" :key="trail.id" :value="trail.id">
              {{ trail.name }}</option
            >
          </select>
      </div>
      <div class="Like">
        <p>{{ this.PARK_LABEL }} {{parkSelect.name}}</p>
        <p>{{ this.TRAIL_LABEL }} {{getSelectedTrail.name}}</p>
        <p>{{ this.AMOUNT_OF_LIKE_LABEL }} {{ getnbOfLikeAssociatedWithTrail }}</p>
        <l-map style=" width: 600px; height:300px" :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-polyline v-for="seg in getSegList" v-bind:key="seg.id" :lat-lngs="seg.coordinates" :color="difficultySwitch(seg.level)"></l-polyline>
          </l-map>
        <button class="btn btn-outline-danger" @click="setLikeToTrail" v-if="!isAlreadyLiked">{{ this.LIKE_LABEL }}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg></button>
        <button @click="deleteLikeToTrail" class="btn btn-outline-danger" v-else>{{ this.DISLIKE_LABEL }}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
        </button>
        </div>
      <div class="Trail center">
      </div>
      </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LPolyline } from 'vue2-leaflet'
import ui from '@/externalization/uiTextPlugin'
export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline
  },
  async created () {
    this.$store.dispatch('park/initializeParks')
    this.$store.dispatch('park/initializeTrails')
    this.isValid()
  },
  data () {
    return {
      trailSelect: '',
      parkSelect: '',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [46.78601339822761, -71.28621784239412],
      PARK_LABEL: ui.PARK_LABEL,
      TRAIL_LABEL: ui.TRAIL_LABEL,
      AMOUNT_OF_LIKE_LABEL: ui.AMOUNT_OF_LIKE_LABEL,
      LIKE_LABEL: ui.LIKE_LABEL,
      DISLIKE_LABEL: ui.DISLIKE_LABEL
    }
  },
  methods: {
    onChangePark (event) {
      this.isValid()
      this.$store.dispatch('park/setPark', event.target.value)
      this.wasAlreadyLogged()
    },
    onChangeTrail (event) {
      this.isValid()
      this.$store.dispatch('likes/initializeLikes', this.profileId)
      this.$store.dispatch('park/setTrail', event.target.value).then(() => {
        this.$store.dispatch('park/getLikesAssociated')
      }, 1000)
      this.wasAlreadyLogged()
    },
    setLikeToTrail () {
      if (this.isLoggedIn) {
        setTimeout(() => {
          this.refreshLikes()
        }, 1115)
        this.$store.dispatch('likes/like', this.newLike)
      }
    },
    deleteLikeToTrail () {
      if (this.isLoggedIn) {
        this.$store.dispatch('likes/deleteLike', this.trailSelect).then(() => {
          this.refreshLikes()
          this.$store.dispatch('likes/initializeLikes', this.profileId)
        })
      }
    },
    refreshLikes () {
      this.$store.dispatch('likes/initializeLikes', this.profileId)
    },
    difficultySwitch (segmentDiff) {
      this.changeCenter()
      switch (segmentDiff) {
        case 'Très Difficile':
          return 'red'
        case 'Difficile':
          return 'orange'
        case 'Intermédiaire':
          return 'blue'
        case 'Facile':
          return 'green'
        case 'Inconnue':
          return 'black'
      }
    },
    changeCenter () {
      this.center = this.getSegList[0].coordinates[0]
    },
    wasAlreadyLogged () {
      if (this.$store.getters['authentication/isLoggedIn'] && this.$store.getters['profiles/getProfile'] !== {}) {
        this.$store.dispatch('profiles/getProfile')
      }
    },
    isValid () {
      if (this.isLoggedIn) {
        if (!this.isValidUser) {
          this.$bvModal.msgBoxOk('veillez vous reconnecter, connection expirer', {
            okTitle: 'logout',
            centered: true,
            okVariant: 'success'
          }).then(() => {
            this.$store.dispatch('authentication/logout').then(() => {
              this.$store.dispatch('profiles/resetProfile')
            }).then(() => {
              this.$router.push('/login')
            })
          })
        }
      }
    }
  },
  computed: {
    filteredList: function () {
      return this.$store.getters['park/getTrailList'].filter(x => x.parkId === this.parkSelect.id)
    },
    fetchParkList: function () {
      return this.$store.getters['park/getParkList']
    },
    getSelectedPark: function () {
      return this.$store.getters['park/getSelectPark']
    },
    getSelectedTrail: function () {
      return this.$store.getters['park/getSelectTrail']
    },
    getSegList: function () {
      return this.$store.state.park.segmentList
    },
    isLoggedIn: function () {
      return this.$store.getters['authentication/isLoggedIn']
    },
    profileId: function () {
      return this.$store.getters['profiles/getAccountId']
    },
    newLike: function () {
      const newLike = {
        userId: this.$store.getters['profiles/getAccountId'],
        trailId: this.trailSelect
      }
      return newLike
    },
    isAlreadyLiked: function () {
      if (this.likesInProfile.find(like => like.trailId === this.newLike.trailId)) {
        return true
      } else {
        return false
      }
    },
    likesInProfile: function () {
      return this.$store.getters['likes/getLikes']
    },
    nbOfLikeInProfile: function () {
      return this.likesInProfile.length
    },
    getnbOfLikeAssociatedWithTrail: function () {
      return this.$store.getters['park/getNbLikesAssociated']
    },
    isValidToken: function () {
      if (this.$store.getters['authentication/isAlive'] === true && this.$store.getters['profiles/getError'] === false) {
        return true
      } else {
        return false
      }
    },
    isValidUser: function () {
      if (this.$store.getters['profiles/getError'] === false) {
        return true
      } else {
        return false
      }
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
#toast-container > .toast {
    background-image: none !important;
}
</style>
