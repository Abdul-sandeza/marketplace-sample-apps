<template>
  <div class="quickconnect-container"> 
    <div class="quick-connects-head">
          <span class="quick-connects-title" > Quick Connects </span>
        </div>

        <div class="quick-connects-body">
        <h4 v-if="!quickconnects.length">No Agents in Quick Connects</h4>
        <b-row :key= "index" v-for="(contact,index) in quickconnects">
          <b-col cols="9">
            <p class="quick-connects-name">{{ contact.name }} </p>
          </b-col>
          <b-col cols="3" class="text-left">
            <font-awesome-icon class="contact-side-icon" style="color:#ccc;cursor:pointer" @click="OnQuickConnectCall(contact)" icon="phone-alt" size="sm"/>
          </b-col>
        </b-row>
        </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import { onAddConference } from "./../../lib/CallActions"
import { checkThirdPartyStatus } from "../../lib/ContactRefresh"

export default {
  name: 'QuickConnects',
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
    async OnQuickConnectCall(contact){
      await onAddConference("quickconnect",contact)
      let confStatus = await checkThirdPartyStatus();
      if(confStatus == 'success') {
        this.$store.dispatch("call/setCallType","conference")
        this.$store.dispatch("actions/callSubNavigation","call")
      } else {
        let postData = {}
        postData.action = "SHOW_NOTIFICATION"
        postData.type = "ERROR"
        postMessage = "Outbound call not connected"
        parent.postMessage('*',postData);
      }
    }
  },
  computed: {
    ...mapGetters([
        'quickconnects'
    ])
  }
}
</script>

<style scoped>

.contact-side-icon {
  margin-right: 5px;
  margin-left: 5px;
}

.quick-connects-name {
  text-align: left !important;
  font-size: 13px;
  margin: 5px;
}

.quick-connects-body {
  margin-top: 10px;
  height: 340px;
  overflow: auto;
}

.quick-connects-head {
  text-align: left;
}

.quick-connects-title {
  font-weight: bold;
  font-size: 20px;
}

</style>
