<template>
  <div class="content-container">
    <dialer v-if="homeSubNav != 'saveContact'"> </dialer>
    <call-contacts class="marginTop" v-if="homeSubNav == 'home'"></call-contacts>
    <save-contact class="marginTop" v-if="homeSubNav == 'saveContact'"></save-contact>

    

    <div v-if="homeSubNav != 'saveContact'" class="dialpad-container-bottom" > 
        <div @click="dialPadToggle()" id="tooltip-target-1" >
        <font-awesome-icon class="dialpad-icon" icon="th" size="md" />
        <b-tooltip target="tooltip-target-1" triggers="hover" noninteractive=true placement="bottom">Dial Pad</b-tooltip>
     
        </div>
    
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import callTriggers from "../../lib/CallTriggers"
import chatTriggers from "../../lib/ChatTriggers"
import { agentStateChange , agentMuteStatus , agentCallStatus} from "../../lib/AgentActions"
import { makeOutboundCall } from "./../../lib/CallActions"
import Dialer from "../Dialer"
import { contactRefresh} from "../../lib/ContactRefresh"
import { websocketConnection } from '../../lib/WebSocket';
import CallContacts from './components/CallContacts.vue';
import SaveContact from './components/SaveContact.vue';

export default {
  name: 'Home',
  components : {
    Dialer,
    CallContacts,
    SaveContact
  },
  data() {
    return {
    }
  },
  async created() {
    // websocketConnection("samplecontactid")
    callTriggers()
    chatTriggers()
    agentStateChange()
    contactRefresh()
    agentMuteStatus()
    agentCallStatus()
    let _this = this;
    let agent = new connect.Agent();
    this.$store.dispatch("agent/updateAgentState" , agent.getState().name);
    this.$store.dispatch("agent/setAgentConfig" , agent.getConfiguration());

    agent.getEndpoints(agent.getAllQueueARNs(), {
      success: (data) => { 
        console.log(data)
        _this.$store.dispatch("agent/setQuickConnects" , data.addresses);
      },
      failure: () => {
        console.log("getting quick connects failed")
      }
    });

    

    // socket.on('transcribe', function (data) {
    //   console.log(data)
    //   _this.$store.dispatch('user/callTranscribe', data)
    // });

    // socket.on('translate', function (data) {
    //   console.log(data)
    //   _this.$store.dispatch('user/callTranslate', data)
    // });

  },
  mounted() {

  },
  methods : {
    dialPadToggle(){
      this.$store.dispatch("common/setDialpadToogle")
    }
  },
  computed: {
    ...mapGetters([
      'call_state',
      'homeSubNav',
      'dialedNumber'
    ])
  }
}
</script>

<style scoped>

.dialpad-icon {
  cursor: pointer;
}


.dialpad-container-bottom {
  height: 40px;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgb(0 0 0 / 8%);
  border-radius: 4px 4px 0 0;
  position: relative;
  width: 106%;
  margin-left: -10px;
  left: 0;
  bottom: 124px;
  background: #fff;
  text-align: center;
  padding: 9px;
  color: #12344d;
  margin-bottom: 150px;
}

.tooltip {
  position:relative; /* making the .tooltip span a container for the tooltip text */
  border-bottom:1px dashed #000; /* little indicater to indicate it's hoverable */
}

.tooltip:before {
  content: attr(data-text); /* here's the magic */
  position:absolute;
  
  /* vertically center */
  top:50%;
  transform:translateY(-50%);
  
  /* move to right */
  left:100%;
  margin-left:15px; /* and add a small left margin */
  
  /* basic styles */
  width:200px;
  padding:10px;
  border-radius:10px;
  background:#000;
  color: #fff;
  text-align:center;

  display:none; /* hide by default */
}

.tooltip:hover:before {
  display:block;
}

.visible {
  height: 3em;
  width: 10em;
  background: yellow;
}

</style>
