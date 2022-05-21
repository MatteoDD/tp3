<template>
    <div>
        <h1>{{ this.SECRET_TEXT }}</h1>
        <p>{{ this.SECRET_TIP }}</p>
        <div class="input-group input-group-sm">
         <div class="input-group-prepend" v-for="u in this.dbd.data.users" :key="u.id" :value="u.name" >
           <span class="input-group-text" id="inputGroup-sizing-sm">{{u}}</span>
         </div>
         <input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="input-group input-group-sm">
         <div class="input-group-prepend" v-for="u in this.dbd.data.likes" :key="u.id" :value="u" >
           <span class="input-group-text" id="inputGroup-sizing-sm">{{u}}</span>
         </div>
        </div>
        <div class="input-group input-group-sm">
         <div class="input-group-prepend" v-for="u in this.dbd.data.parks" :key="u.id" :value="u" >
           <span class="input-group-text" id="inputGroup-sizing-sm">{{u}}</span>
         </div>
        </div>
        <div class="input-group input-group-sm">
         <div class="input-group-prepend" v-for="u in this.dbd.data.levels" :key="u.id" :value="u" >
           <span class="input-group-text" id="inputGroup-sizing-sm">{{u}}</span>
         </div>
         <input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="input-group input-group-sm">
         <div class="input-group-prepend" v-for="u in this.userd.data" :key="u.id" :value="u" >
           <span class="input-group-text" id="inputGroup-sizing-sm">{{u}}</span>
         </div>
         <input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm">
        </div>
    </div>
</template>

<script>
import ui from '@/externalization/uiTextPlugin'
import axios from 'axios'
import { API } from '@/shared/config'
export default {
  data () {
    return {
      dbd: {},
      userd: {},
      SECRET_TEXT: ui.SECRET_TEXT,
      SECRET_TIP: ui.SECRET_TIP
    }
  },
  created () {
    this.fetchall()
  },
  methods: {
    async db () {
      this.dbd = await axios.create({}).get(`${API}/db`)
    },
    async user () {
      this.userd = await axios.create({}).get(`${API}/generatedUsers`)
    },
    fetchall () {
      this.db()
      this.user()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
