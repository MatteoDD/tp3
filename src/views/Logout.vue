<template>
    <div>
        <!-- ajouter nom du profil avec aurevoir -->
        <button @click="logout">Déconecté</button>
    </div>
</template>

<script>
export default {
  name: 'LogoutComponent',
  methods: {
    logout () {
      this.$store.dispatch('authentication/logout')
      this.$store.dispatch('profiles/resetProfile')
    //   this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
