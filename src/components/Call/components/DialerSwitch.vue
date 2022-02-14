<template>
  <div class="dialer-switch-container">
    <b-button pill size="sm" @click="changeCallSubNav('call')" variant="outline-secondary" id="tooltip-target-back">
      <font-awesome-icon icon="chevron-left" size="sm" /> Back 
    </b-button>
     <b-tooltip target="tooltip-target-back" triggers="hover" noninteractive=true placement="bottom">Back</b-tooltip>
    <b-button size="sm" v-if="callSubNav == 'quickconnects'" @click="changeCallSubNav('dialpad')" id="tooltip-target-dialpad" variant="secondary">
      <font-awesome-icon  icon="th" size="sm"/> Dial Pad
    </b-button>
    <b-tooltip target="tooltip-target-dialpad" triggers="hover" noninteractive=true placement="bottom">Dial Pad</b-tooltip>

    <b-button size="sm" v-if="callSubNav == 'dialpad'" @click="changeCallSubNav('quickconnects')" id="tooltip-target-quickconnect" variant="secondary">
      <dialer></dialer>
      <font-awesome-icon  icon="th" size="sm"/> Quick Connects
    </b-button>
    <b-tooltip target="tooltip-target-quickconnect" triggers="hover" noninteractive=true placement="bottom">Quick Connects</b-tooltip>

  </div>    
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DialerSwitch',
  data() {
    return {
    }
  },
  methods: {
    changeCallSubNav(page) {
      this.$store.dispatch('actions/callSubNavigation',page)
    }
  },
  computed: {
    ...mapGetters([
      'callSubNav'
    ])
  }
}
</script>

<style scoped>
.dialer-switch-container > button {
  margin-right: 5px;
}

.dialer-switch-container {
  margin-top: 15px;
  text-align: center;
}
</style>
