<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">{{ this.HOME_ROUTE_LABEL }}</router-link>
      <router-link to="/login" v-if="!logged" >{{ this.LOGIN_ROUTE_LABEL }}</router-link>
      <router-link to="/signup" v-if="!logged">{{ this.SIGNUP_ROUTE_LABEL }}</router-link>
      <router-link to="/logout" v-if="logged">{{ this.LOGOUT_ROUTE_LABEL }}</router-link>
      <router-link to="/admin32323232" v-if="logged && isAdmin">{{ this.SECRET_ADMIN_ROUTE_LABEL }}</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import ui from '@/externalization/uiTextPlugin'
export default {
  name: 'App',
  data () {
    return {
      HOME_ROUTE_LABEL: ui.HOME_ROUTE_LABEL,
      LOGIN_ROUTE_LABEL: ui.LOGIN_ROUTE_LABEL,
      SIGNUP_ROUTE_LABEL: ui.SIGNUP_ROUTE_LABEL,
      LOGOUT_ROUTE_LABEL: ui.LOGOUT_ROUTE_LABEL,
      SECRET_ADMIN_ROUTE_LABEL: ui.SECRET_ADMIN_ROUTE_LABEL
    }
  },
  computed: {
    logged: function () {
      return this.$store.getters['authentication/isLoggedIn']
    },
    isAdmin: function () {
      if (this.$store.getters['profiles/getRole'] === 'admin') {
        return true
      }
      return false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  background-color: #28282b;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
