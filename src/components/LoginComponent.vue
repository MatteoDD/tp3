<template>
  <div class="box center">
    <div class="c">
      <form>
        <input
          type="text"
          class="form-control"
          id="email"
          name="email"
          placeholder="courriel@courriel.com"
          v-model="newProfile.email"
        /><br />
        <input
          type="text"
          class="form-control"
          id="password"
          name="password"
          placeholder="********"
          v-model="newProfile.password"
        /><br />
        <button type="button" class="btn btn-primary" @click="login">Se connecter</button>
      </form>
      <br />
      <router-link to="/signup">Créer un compte</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginComponent',
  data () {
    return {
      newProfile: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    // pourrait etre servie aussi pour la connexion vu utilisation + que 2 fois(register et login)
    async login () {
      await this.$store.dispatch('authentication/login', {
        email: this.newProfile.email,
        password: this.newProfile.password
      })
      if (this.isLogged) {
        this.$store.dispatch('profiles/getProfile')
        this.$router.push('/')
      }
    }
  },
  computed: {
    isLogged () {
      return this.$store.getters['authentication/isLoggedIn']
    }
  }
}
</script>

<style lang="css" scoped>
.box {
  width: 300px;
  height: 230px;
  -webkit-box-shadow: 13px 13px 3px 0px #ebebeb;
  box-shadow: 13px 13px 3px 0px #ebebeb;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
}

.c {
  display: inline-block;
  text-align: center;
}

.btn-primary {
  color: #fff;
  background-color: #7b7b7c;
  border-color: #7b7b7c;
}
</style>
