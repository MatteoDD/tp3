<template>
    <div>
        <h1>binvenu controleur de lapp</h1>
        <button @click="fetchall">yup</button>
        <p>click pour voir dans dev tool la bd complette et users</p>
    </div>
</template>

<script>
import axios from 'axios'
import { API } from '@/shared/config'
export default {
  data () {
    return {
      dbd: {},
      userd: {}
    }
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
