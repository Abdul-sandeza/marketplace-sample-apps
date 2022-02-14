<template>
    <div class="call-handler">
        <div class="call-handler-contents">
          <h6>{{ call_state }}</h6>
          <h5>{{ caller_name }}</h5>
          <h6>{{ caller_number}}</h6>
          <div class="call-handle-buttons-container">
                <b-button @click="OnClearContacts(),cancelEditor()" size="sm" variant="secondary">
                  Clear Contacts
                </b-button>
          </div>
        </div>
    </div>      

</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import {onClearContacts} from "../../../lib/CallActions"

export default {
  name: 'AfterCallWork',
  data() {
    return {
        
    }
  },
  methods: {
    OnClearContacts() {
      onClearContacts()
    },
    cancelEditor(){
    this.$store.dispatch("ticket/toggleEditor",false)
    this.$store.dispatch("ticket/toggleNoteButton",false)
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
