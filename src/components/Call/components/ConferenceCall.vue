<template>
    <div class="call-handler">
        <div class="call-handler-contents">
          <div class="call-handle-buttons-container">
              <b-row class="call-history-row">
                <b-col cols="9">
                  <p class="call-history-values call-history-values-name" > <b> ( {{ hold_status ? "On Hold" : "Connected" }} ) </b> {{ caller_name }} </p>
                  </b-col>
                <b-col cols="3" class="text-left">
                  <font-awesome-icon v-if="(!hold_status) && (!hold_status && !third_party_hold_status)" class="contact-side-icon" @click="OnholdToggleInitialCall()" icon="pause" size="sm"/>
                  <font-awesome-icon class="contact-side-icon" @click="OnEndInitialCall()" icon="phone-slash" size="sm"/>
                </b-col>
              </b-row>

              <b-row class="call-history-row">
                <b-col cols="9">
                  <p class="call-history-values call-history-values-name" > <b> ( {{ third_party_hold_status ? "On Hold" : "Connected" }} ) </b> {{ third_party_caller_name }} </p>
                  </b-col>
                <b-col cols="3" class="text-left">
                  <font-awesome-icon v-if="(!third_party_hold_status) && (!hold_status && !third_party_hold_status)" class="contact-side-icon" @click="OnholdToggleThirdPartyCall()"  icon="pause" size="sm"/>
                  <font-awesome-icon class="contact-side-icon" @click="OnEndThirdPartyCall()" icon="phone-slash" size="sm"/>
                </b-col>
              </b-row>

              <div class="call-handle-buttons-container">
                <b-button size="sm" v-if="(!hold_status && !third_party_hold_status) || (hold_status && !third_party_hold_status) || (!hold_status && third_party_hold_status)" @click="OnHoldAll()" pill class="call-control-buttons" variant="secondary">
                  <font-awesome-icon  icon="pause" size="sm"/>
                </b-button>
                <b-button size="sm" v-if="hold_status && third_party_hold_status" @click="OnResumeAll()" pill class="call-control-buttons" variant="secondary">
                  <font-awesome-icon  icon="play" size="sm"/>
                </b-button>
                <b-button size="sm" @click="OnMuteToggle()" pill class="call-control-buttons" :variant="mute_status ? 'primary' : 'secondary' ">
                  <font-awesome-icon  :icon="mute_status ? 'microphone-alt-slash' : 'microphone-alt'" size="sm"/> 
                </b-button>
                <b-button size="sm" v-if="(hold_status && !third_party_hold_status) || (!hold_status && third_party_hold_status)" @click="OnJoinCall()" pill class="call-control-buttons" variant="secondary">
                  <font-awesome-icon  icon="compress" size="sm"/> 
                </b-button>
                <b-button size="sm" v-if="(hold_status && !third_party_hold_status) || (!hold_status && third_party_hold_status)" @click="OnSwapCall()" pill class="call-control-buttons" variant="secondary">
                  <font-awesome-icon  icon="exchange-alt" size="sm"/>
                </b-button>
                <b-button @click="OnLeaveCall()" class="call-handle-buttons" size="sm" variant="danger">
                  <font-awesome-icon  icon="phone-slash" size="sm"/>   Leave call
                </b-button>
              </div>
            </div>  
        </div>
    </div>      

</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import {onholdToggleInitialCall , onholdToggleThirdPartyCall ,  onMuteToggle , onSwapCall, onJoinCall , onHoldAll , onResumeAll , onLeaveCall , onEndIntialCall , onEndThirdPartyCall} from "../../../lib/CallActions.js"

export default {
  name: 'IncomingCall',
  data() {
    return {
    }
  },
  methods: {
    OnholdToggleInitialCall() {
      onholdToggleInitialCall()
    },
    OnholdToggleThirdPartyCall() {
      onholdToggleThirdPartyCall()
    },
    OnEndInitialCall() {
      onEndIntialCall()
    },
    OnEndThirdPartyCall() {
      onEndThirdPartyCall()
    },
    OnMuteToggle(){
      onMuteToggle(this.mute_status)
    },
    OnSwapCall() {
      onSwapCall()
    },
    OnJoinCall() {
      onJoinCall()
    },
    OnHoldAll(){
      onHoldAll()
    },
    OnResumeAll() {
      onResumeAll()
    },
    OnLeaveCall() {
      onLeaveCall()
    }
  },
  computed: {
    ...mapGetters([
      'call_state',
      'caller_name',
      'caller_number',
      'mute_status',
      'hold_status',
      'third_party_hold_status',
      'third_party_caller_name'
    ])
  }
}
</script>

<style scoped>

.contact-side-icon {
  color:#ccc;
  cursor:pointer;
}

.call-history-values {
  margin-bottom: 0px !important;
  text-align: left !important;
}

.call-history-values-name {
  font-size: 13px !important;
  cursor: pointer;
}

.call-history-values-name:hover {
  color: #2c5cc5;
}

.call-history-row {
  padding: 5px 0 ;
}

.call-handle-buttons-container{
  margin-top: 10px;
}

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
