export const uiTextPlugin = {
  welcomeMessage: 'Allo tout le monde !',
  PARK_LABEL: 'Park: ',
  TRAIL_LABEL: 'Trail: ',
  AMOUNT_OF_LIKE_LABEL: 'Amount of likes on this trail : ',
  LIKE_LABEL: 'Like',
  DISLIKE_LABEL: 'Dislike',
  HOME_ROUTE_LABEL: 'Home |',
  LOGIN_ROUTE_LABEL: ' Login |',
  SIGNUP_ROUTE_LABEL: ' Signup ',
  LOGOUT_ROUTE_LABEL: ' Déconnexion',
  SECRET_ADMIN_ROUTE_LABEL: ' || Admin ||',
  EMAIL_LABEL: 'courriel@courriel.com',
  PASSWORD_LABEL: '********',
  LOGIN_BUTTON_LABEL: 'Se connecter',
  REGISTER_BUTTON_LABEL: 'Créer un compte',
  NAME_LABEL: 'Nom',
  REGISTER_LABEL: 'S\'enregistrer',
  SECRET_TEXT: 'Admin Panel de l\'application!',
  SECRET_TIP: 'Vous pouvez accéder à la page d\'administration, veuillez jeter un coup d\'oeil au devtool.'
}

// Plugin pour VueJs
// https://coderethinked.com/3-different-ways-to-access-constants-in-a-vue-template/
uiTextPlugin.install = function (Vue) {
  Vue.prototype.$getUiText = key => {
    return uiTextPlugin[key]
  }
}

export default uiTextPlugin
