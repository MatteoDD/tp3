<template>
    <div>
        <button @click="logout">Déconnexion</button>
    </div>
</template>

<script>
export default {
  name: 'LogoutComponent',
  methods: {
    logout () {
      this.$store.dispatch('authentication/logout')
      this.$store.dispatch('profiles/resetProfile')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
