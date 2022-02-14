<template>
    <div>
          <b-tabs 
          content-class="mt-3" 
          fill
          active-nav-item-class="my-nav-active"
          >
            <b-tab @click="contactTabSelected = false">
              <template v-slot:title>
                <font-awesome-icon class="contact-side-icon" icon="phone" size="sm"/> Call Logs
              </template>
              <div class="call-logs-list">
                <b-row :key= "index" v-for="(call,index) in callLogs.filter(callLogs => !dialedNumber || callLogs.callerNumber.toLowerCase().includes(dialedNumber.toLowerCase()) || callLogs.callerName.toLowerCase().includes(dialedNumber.toLowerCase()))" class="call-history-row">
                  <b-col cols="1">
                    <font-awesome-icon v-if="call.callType == 'missed'" style="color:#dc3545" icon="level-up-alt" size="lg"/>
                    <font-awesome-icon v-if="call.callType == 'outgoing'" style="color:#0d6efd" icon="arrow-up" size="lg"/>
                    <font-awesome-icon v-if="call.callType == 'incoming'" style="color:#198754" icon="arrow-down" size="lg"/>
                  </b-col>
                  <b-col cols="7">
                    <p @click="openContact(call.callerId)" class="call-history-values call-history-values-name" >{{ call.callerName }}</p>
                    <p class="call-history-values call-history-values-number">{{ call.callerNumber }}</p>
                    <p class="call-history-values call-history-values-date">{{ call.calledTime }}</p>
                    </b-col>
                  <b-col cols="3" class="text-left">
                    <font-awesome-icon class="contact-side-icon" style="color:#ccc;cursor:pointer" @click="dialFromHistory(call.callerName,call.callerNumber)" icon="phone" size="sm" id="tooltip-target-3"/>
                    <b-tooltip target="tooltip-target-3" triggers="hover">
                        Outbound Call
                    </b-tooltip>
                    <font-awesome-icon class="contact-side-icon" v-if="call.callerName == 'Unknown Caller'" style="color:#ccc;cursor:pointer" @click="addContact(call.callerNumber)" icon="user-plus" size="sm" id="tooltip-target-2" />
                     <b-tooltip target="tooltip-target-2" triggers="hover">
                       Add Contact
                     </b-tooltip>
                     
                  </b-col>
                </b-row>
                 
              </div>
            </b-tab>
            <b-tab @click="contactTabSelected = true">
              <template v-slot:title>
                <font-awesome-icon class="contact-side-icon" icon="address-book" size="sm"/> Contacts
              </template>
              
              <!-- <b-form-input id="input-small" :change="searchContact()" v-model="searchContactInput" size="sm" placeholder="Search ..."></b-form-input> -->

              <div class="call-logs-list">
                <b-row :key= "index" v-for="(call,index) in contactList" class="call-history-row">
                  <b-col cols="1"><font-awesome-icon style="color:#ccc" icon="user" size="lg"/></b-col>
                  <b-col cols="7">
                    <p @click="openContact(call.contactId)" class="call-history-values call-history-values-name" >{{ call.contactName }}</p>
                    <p class="call-history-values call-history-values-number">{{ call.contactNumber }}</p>
                    </b-col>
                  <b-col cols="3" class="text-left">
                    <font-awesome-icon class="contact-side-icon" style="color:#ccc;cursor:pointer"  @click="dialFromHistory(call.contactName,call.contactNumber)" icon="phone" size="sm" />
                    
                    <font-awesome-icon class="contact-side-icon" v-if="call.contactName == 'Unknown Caller'" style="color:#ccc;cursor:pointer" @click="addContact(call.contactNumber)" icon="user-plus" size="sm"/>
                    
                  </b-col>
                </b-row>
              </div>
            </b-tab>
          </b-tabs>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import { makeOutboundCall } from './../../../lib/CallActions'

export default {
    name: 'CallContacts',
    components : {

    },
    data() {
      return {
          contactTabSelected : true,
          dialedNumber: "",
          searchContactInput: ""
      }
    },

    methods: {
        openContact(callerId){
            var passData = {};
            passData.action = "OPEN_CONTACT";
            passData.contactId = callerId;
            console.log(passData)
            parent.postMessage(passData,"*");
        },
        dialFromHistory(name,number) {
            makeOutboundCall(name,number)
            this.$store.dispatch("actions/setOutboundCall", true)
        },
        addContact(number) {
            this.$store.dispatch("actions/setSaveNumber",number)
            this.$store.dispatch("actions/homeSubNavigation", "saveContact")
        },
        searchContact(){
          if(this.searchContactInput.length >= 3) {
            var passData = {};
            passData.action = "SEARCH_CONTACT";
            passData.text = this.searchContactInput;
            console.log(passData)
            parent.postMessage(passData,"*");
          }
        }
    },
    computed: {
        ...mapGetters([
        'callLogs',
        'contactList'
        ])
    }
}
</script>

<style scoped>

.contact-side-icon {
    margin-right: 5px;
    margin-left: 5px;
}

.call-logs-list {
  height: 328px;
  overflow-x: hidden;
  overflow-y: scroll;
}  

.call-logs-list::-webkit-scrollbar {
  display: none;
}

.call-logs-list {
  -ms-overflow-style: none;
}

.call-history-row {
  padding: 5px 0 ;
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

.call-history-values-number {
  font-size: 12px !important;
}

.call-history-values-date {
   font-size: 8px !important;
}

.call-history-values-right-buttons {
  display: inline-flex;
}

.call-history-values-right-buttons-icons {
  margin: 2px;
}
</style>
