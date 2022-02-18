<template>
    <div class="call-handler">
        <div class="call-handler-contents">
          <h6>{{ call_state }}</h6>
          <h5>{{callerName()}}</h5>
          <h6>{{ caller_number}}</h6>
          <h9 :state="time" v-if="call_state=='CONNECTED'">{{displayHours}}:{{displayMinutes}}:{{displaySeconds}}</h9>
          
          <div class="call-handle-buttons-container">
              <b-button size="sm" @click="OnholdToggleInitialCall()" id="tooltip-target-hold" pill class="call-control-buttons" :variant="hold_status ? 'warning' : 'secondary'">
                  <font-awesome-icon  :icon="hold_status ? 'play' : 'pause'" size="sm"/>
                </b-button>
              <b-tooltip target="tooltip-target-hold" triggers="hover" noninteractive=true placement="bottom">Hold/Play</b-tooltip>

                <b-button size="sm" @click="OnMuteToggle()" id= "tooltip-target-mute" pill class="call-control-buttons" :variant="mute_status ? 'primary' : 'secondary'">
                  <font-awesome-icon  :icon="mute_status ? 'microphone-alt-slash' : 'microphone-alt' " size="sm"/> 
                </b-button>
              <b-tooltip target="tooltip-target-mute" triggers="hover" noninteractive=true placement="bottom">Mute</b-tooltip>
  

                <b-button size="sm" @click="OnDialPadToggle()" id="tooltip-target-dp" pill class="call-control-buttons" variant="secondary">
                  <font-awesome-icon  icon="th" size="sm"/> 
                </b-button>
                <b-tooltip target="tooltip-target-dp" triggers="hover" noninteractive=true placement="bottom">Dial Pad</b-tooltip>

                <b-button size="sm" @click="OnQuickTransfer()" id="tooltip-target-qc" pill class="call-control-buttons" variant="secondary">
                  <font-awesome-icon  icon="random" size="sm"/>
                </b-button>
                <b-tooltip target="tooltip-target-qc" triggers="hover" noninteractive=true placement="bottom">Quick Connect</b-tooltip>

                <b-button @click="OnEndIntialCall()" id="tooltip-target-ec" class="call-handle-buttons" size="sm" variant="danger">
                  <font-awesome-icon  icon="phone-slash" size="sm"/>   End Call
                </b-button>
                <b-tooltip target="tooltip-target-ec" triggers="hover" noninteractive=true placement="bottom">End Call</b-tooltip>

          </div>
        </div>
    </div>      

</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import {onholdToggleInitialCall , onMuteToggle , onEndIntialCall} from "../../../lib/CallActions.js"

export default {
  name: 'IncomingCall',
  data() {
    return {
        pageUrl : "home",

    }
  },
  methods: {
    OnholdToggleInitialCall() {
      onholdToggleInitialCall()
    },
    OnMuteToggle() {
      onMuteToggle(this.mute_status)
    },
    OnDialPadToggle() {
      this.$store.dispatch('actions/callSubNavigation', "dialpad")
    },
    OnQuickTransfer() {
      this.$store.dispatch('actions/callSubNavigation', "quickconnects")
    },
    OnEndIntialCall() {
        onEndIntialCall()
    },
    callerName(){
      if(this.caller_name=='Unknown Caller'){
        return this.caller_name = 'Calling...'
      }else{
        return this.caller_name
      }
    },
    showRemaining(){
      const timer = setInterval(()=>{
        const startTime = new Date(this.start_time).getTime();
        const endTime = new Date(this.end_time).getTime();
        

      })
    }
  },
  computed: {
    ...mapGetters([
      'call_state',
      'caller_name',
      'caller_number',
      'mute_status',
      'hold_status',
      'start_time',
      'end_time',
      'displayHours',
      'displayMinutes',
      'displaySeconds'
    ]),
    time(){
      if(this.call_state == 'CONNECTED'){
        function startTime(){
          this.displaySeconds += 1;
          
        }
        setInterval(startTime,1000)
      }
    }
  }
}
</script>

<style scoped>

.call-handle-buttons{
  width: 110px;
  margin: 0 5px;
}

.call-handler {
  display: table;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.call-handler-contents {
  display: table-cell;
  margin: 0;
}

.call-control-buttons {
   margin: 0 5px;
}

.call-handle-buttons{
  width: 110px;
  margin: 0 5px;
}
</style>
