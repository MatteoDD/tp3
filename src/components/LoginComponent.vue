<template>
  <div class="box center">
    <div class="c">
      <form>
        <input
          type="text"
          class="form-control"
          id="email"
          name="email"
          v-bind:placeholder="this.EMAIL_LABEL"
          v-model="newProfile.email"
        /><br />
        <!-- mettre le type en password -->
        <input
          type="text"
          class="form-control"
          id="password"
          name="password"
          v-bind:placeholder="this.PASSWORD_LABEL"
          v-model="newProfile.password"
        /><br />
        <button id="button" type="button" class="btn btn-primary" @click="login">{{ this.LOGIN_BUTTON_LABEL }}</button>
      </form>
      <br />
      <router-link to="/signup">{{ this.REGISTER_BUTTON_LABEL }}</router-link>
    </div>
  </div>
</template>
<script>
import ui from '@/externalization/uiTextPlugin'
export default {
  name: 'LoginComponent',
  data () {
    return {
      newProfile: {
        email: '',
        password: ''
      },
      EMAIL_LABEL: ui.EMAIL_LABEL,
      PASSWORD_LABEL: ui.PASSWORD_LABEL,
      LOGIN_BUTTON_LABEL: ui.LOGIN_BUTTON_LABEL,
      REGISTER_BUTTON_LABEL: ui.REGISTER_BUTTON_LABEL,
      ERROR_MESSAGE: ui.ERROR_MESSAGE_2
    }
  },
  created () {
    this.$store.dispatch('profiles/resetProfile')
  },
  methods: {
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
