<template>
    <div class="call-handler">
        <div class="call-handler-contents">
          <h6>{{ call_state }} CALL </h6>
          <h5>{{caller_name}}</h5>
          <h6>{{ caller_number}}</h6>
          <div class="call-handle-buttons-container">
              <b-button size="sm"  @click="endCall()" class="call-handle-buttons" variant="danger">
                <font-awesome-icon  icon="phone-slash" size="sm"/>   End Call
              </b-button>
          </div>
          
        </div>
  
    </div>      

</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import {onAcceptCall , onDeclineCall} from "../../../lib/CallActions"

export default {
  name: 'IncomingCall',
  data() {
    return {
        pageUrl : "home"
    }
  },
  methods: {
    acceptCall() {
      onAcceptCall()
    },
    declineCall() {
      onDeclineCall()
    }
   
  },
  computed: {
    ...mapGetters([
      'call_state',
      'caller_name',
      'caller_number'
    ])
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



</style>
