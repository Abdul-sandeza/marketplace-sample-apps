<template>
  <b-row class="text-center title-bar">
    <b-col cols="3">
      <img class="main-logo" src="../../assets/NYRA.jpg" alt="main-logo" />
    </b-col>
    <b-col cols="7">
      <b-dropdown
        size="lg"
        variant="link"
        toggle-class="text-decoration-none"
        :class="pageroute == 'call' ? 'fontIcon makeDisable' : 'fontIcon'"
        no-caret
      >
        <template v-slot:button-content>
          <span class="title-status"> {{ current_agent_state }} </span>
          <font-awesome-icon
            class="fontIcon"
            style="font-size: 14px;"
            icon="chevron-down"
          />
        </template>

        <b-dropdown-item
          v-for="state in agent_states"
          :key="state.type"
          @click="changeAgentState(state)"
          style="fontIcon makeDisable"
        >
          {{ state.name }}
        </b-dropdown-item>
      </b-dropdown>
    </b-col>
    <b-col style="padding-top: 10px">
      <!-- <font-awesome-icon @click="toggleProfile()" :class="pageroute == 'call' ? 'fontIcon settingsIcon makeDisable' : 'fontIcon settingsIcon'" icon="user" size="lg"/> -->
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import 'amazon-connect-streams'
import 'amazon-connect-chatjs'

export default {
  name: 'Navbar',
  data() {
    return {}
  },
  methods: {
    changeAgentState(agentState) {
      let agent = new connect.Agent()
      agent.setState(agentState)
    },
    toggleProfile() {
      this.$store.dispatch(
        'common/routePage',
        this.pageroute == 'home' ? 'profile' : 'home'
      )
    },
  },
  computed: {
    ...mapGetters(['agent_states', 'current_agent_state', 'pageroute']),
  },
}
</script>

<style scoped>
.makeDisable {
  pointer-events: none !important;
  cursor: not-allowed !important;
}

.title-bar {
  background-color: #12344d;
  margin: 0px !important;
  color: #fff;
  height: 48px;
  align-items: center;
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid #264966;
}

.main-logo {
  width: 2.5rem;
  height: 2.5rem;
  /* margin-top: 16px; */
}

.title-status {
  color: #ffffff;
  font-size: 19px;
  font-weight: 200;
}

.fontIcon {
  color: #fff;
  cursor: pointer;
}
</style>
