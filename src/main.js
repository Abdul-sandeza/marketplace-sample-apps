import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueCountryCode from "vue-country-code";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faUser,  faUserSecret,faExchangeAlt,faArrowUp , faComment , faCommentSlash, faLevelUpAlt, faCompress ,faTimes, faPlay , faExternalLinkAlt, faChevronDown ,faChevronLeft , faAddressBook , faCog , faPlus, faPhone , faPhoneSlash ,faPhoneAlt, faTh , faCaretDown,faMicrophoneAlt,faMicrophoneAltSlash,faPause,faRandom, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Tooltip from "v-tooltip";

Vue.use(VueCountryCode);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.use(Tooltip)
library.add(faUserPlus, faArrowDown , faArrowUp,faLevelUpAlt , faComment , faCommentSlash, faUser,faUserSecret,faExchangeAlt, faCompress,faPlay,faTimes, faChevronDown,faExternalLinkAlt,faChevronLeft,faAddressBook,faCog,faPhone,faPlus,faPhoneSlash,faPhoneAlt,faTh,faCaretDown,faMicrophoneAlt , faMicrophoneAltSlash,faPause,faRandom)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
