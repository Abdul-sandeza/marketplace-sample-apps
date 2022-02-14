<template>
  <div class="content-container">

    <div v-if="callSubNav == 'call'">

      <div v-if="call_type == 'normal'">
        <incoming-call v-if=" (call_state == 'INCOMING' || call_state == 'CONNECTING' || call_state == 'ACCEPTED') && !outboundCall"> </incoming-call>
        <normal-call v-if=" (call_state == 'CONNECTED' || outboundCall ) && call_state != 'ACW'"></normal-call>
        <after-call-work v-if=" call_state == 'ACW' || call_state == 'MISSED'"></after-call-work>
      </div>

      <div v-if="call_type == 'conference'"> 
        <conference-call> </conference-call>
      </div>
     

      <tickets v-if="call_state != 'MISSED'" style="margin-top: 5px"></tickets>

    </div>

    <div v-if="callSubNav == 'dialpad'">
      <dialer></dialer>
      <dialer-switch></dialer-switch>
    </div>  
    <div v-if="callSubNav == 'quickconnects'">
      <quick-connects> </quick-connects>
      <dialer-switch></dialer-switch>
    </div>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import IncomingCall from './components/IncomingCall.vue';
import NormalCall from './components/NormalCall.vue';
import Tickets from './components/Tickets.vue';
import AfterCallWork from './components/AfterCallWork.vue';
import ConferenceCall from './components/ConferenceCall.vue';
import Dialer from './../Dialer';
import DialerSwitch from './components/DialerSwitch.vue';
import QuickConnects from './../QuickConnects'

export default {
  name: 'Call',
  components : {
    IncomingCall,
    NormalCall,
    Tickets,
    AfterCallWork,
    ConferenceCall,
    Dialer,
    QuickConnects,
    DialerSwitch
  },
  data() {
    return {

    }
  },
  created() {
      // this.$store.dispatch("ticket/setTickets" , this.contact_attributes);
  },
  methods : {
    dialPadToggle(){
      this.$store.dispatch("common/setDialpadToogle")
    }
  },
  computed: {
    ...mapGetters([
      'call_state',
      'contact_attributes',
      'outboundCall',
      'call_type',
      'callSubNav'
    ])
  }
}
</script>

<style scoped>

.dialpad-container-bottom {
  height: 40px;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgb(0 0 0 / 8%);
  border-radius: 4px 4px 0 0;
  position: absolute;
  width: 106%;
  margin-left: -10px;
  left: 0;
  bottom: 18px;
  background: #fff;
  text-align: center;
  padding: 9px;
  color: #12344d;
}

</style>
