<template>
  <div class="box center">
    <div class="c">
      <form>
        <input
          type="text"
          class="form-control"
          id="name"
          name="name"
          v-bind:placeholder="this.NAME_LABEL"
          v-model="newProfile.name"
        /><br />
        <input
          type="text"
          class="form-control"
          id="email"
          name="email"
          v-model="newProfile.email"
          v-bind:placeholder="this.EMAIL_LABEL"
        /><br />
        <input
          type="text"
          class="form-control"
          id="password"
          name="password"
          v-bind:placeholder="this.PASSWORD_LABEL"
          v-model="newProfile.password"
        /><br />
        <button type="button" @click="signup" class="btn btn-primary">{{ this.REGISTER_LABEL }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import ui from '@/externalization/uiTextPlugin'
export default {
  name: 'SignupComponent',
  data () {
    return {
      newProfile: {
        email: '',
        password: '',
        name: ''
      },
      NAME_LABEL: ui.NAME_LABEL,
      PASSWORD_LABEL: ui.PASSWORD_LABEL,
      EMAIL_LABEL: ui.EMAIL_LABEL,
      REGISTER_LABEL: ui.REGISTER_LABEL
    }
  },
  methods: {
    async signup () {
      if (this.newProfile.email && this.newProfile.password) {
        await console.log(this.newProfile)
        await this.$store.dispatch('authentication/register', this.completeProfile)
        if (this.isLogged) {
          await this.$store.dispatch('profiles/getProfile')
          this.$router.push('/')
        }
      }
    }
  },
  computed: {
    isLogged () {
      return this.$store.getters['authentication/isLoggedIn']
    },
    completeProfile () {
      const completeProfile = {
        // name: this.newProfile.email.substr(0, this.newProfile.email.indexOf('@')),
        name: this.newProfile.name,
        email: this.newProfile.email,
        password: this.newProfile.password
      }
      return completeProfile
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
