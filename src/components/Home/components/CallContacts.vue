<template>
    <div>
      <div style="margin-bottom:10px"> 
        <span @click="contactTabSelected = false" v-bind:class="[ { 'tab-head-home-active' : !contactTabSelected }, 'tab-head-home' ]" style="margin-right:5px"> Recent Calls </span>
        <span @click="contactTabSelected = true" v-bind:class="[ { 'tab-head-home-active' : contactTabSelected }, 'tab-head-home' ]"> Contacts </span>
        <b-form-input id="input-small" :change="searchContact()" v-model="searchContactInput" size="sm" placeholder="Search"></b-form-input>
        <!-- <h5 class="no-contact-found" v-if="!callLogs.filter(callLogs => !searchContactInput || callLogs.callerNumber.toLowerCase().includes(searchContactInput.toLowerCase()) || callLogs.callerName.toLowerCase().includes(searchContactInput.toLowerCase())).length  ">Contact Not Found</h5> -->

      </div> 
      
      <div v-if="!contactTabSelected" class="call-logs-list">
        <b-row :key= "index"  v-for="(call,index) in callLog().filter(callLogs => !searchContactInput || callLogs.callerNumber.toLowerCase().includes(searchContactInput.toLowerCase()) || callLogs.callerName.toLowerCase().includes(searchContactInput.toLowerCase()))" class="call-history-row">

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
            <font-awesome-icon  class="contact-side-icon" style="color:#ccc;cursor:pointer;" v-b-tooltip.hover title="Call"  @click="dialFromHistory(call.callerName,call.callerNumber)" id="index" icon="phone-alt" size="sm"/>
             <!-- <b-tooltip target="index" noninteractive=true triggers="hover">
                        Call
             </b-tooltip> -->
            <font-awesome-icon class="contact-side-icon" v-if="call.callerName == 'Unknown Caller'" id="tooltip-target-4" style="color:#ccc;cursor:pointer"  v-b-tooltip.hover title="Add Contact" variant="danger"  @click="addContact(call.callerNumber)" icon="user-plus" size="sm"/>
              <!-- <b-tooltip target="tooltip-target-4" noninteractive=true triggers="hover">
                        Add Contact
             </b-tooltip> -->
          </b-col>
        </b-row>
        
            
      </div>

      <div v-if="contactTabSelected" class="call-logs-list">
        <b-row :key= "index" v-for="(call,index) in contactList.filter(contactList => !searchContactInput || contactList.contactNumber.toLowerCase().includes(searchContactInput.toLowerCase()) || contactList.contactName.toLowerCase().includes(searchContactInput.toLowerCase()) )" class="call-history-row">
         
          <b-col cols="1"><font-awesome-icon style="color:#ccc" icon="user" size="lg"/></b-col>
          <b-col cols="7">
            <p @click="openContact(call.contactId)" class="call-history-values call-history-values-name" >{{ call.contactName }}</p>
            <p class="call-history-values call-history-values-number">{{ call.contactNumber }}</p>
            </b-col>
          <b-col cols="3" class="text-left">
            <font-awesome-icon class="contact-side-icon" style="color:#ccc;cursor:pointer" v-b-tooltip.hover title="Call" id="tooltip-target-5" @click="dialFromHistory(call.contactName,call.contactNumber)" icon="phone-alt" size="sm"/>
             <!-- <b-tooltip target="tooltip-target-5" triggers="hover">
                        Call
             </b-tooltip> -->
            <font-awesome-icon class="contact-side-icon" v-if="call.contactName == 'Unknown Caller'" v-b-tooltip.hover title="Add Contact" id="tooltip-target-6" style="color:#ccc;cursor:pointer" @click="addContact(call.contactNumber)" icon="user-plus" size="sm"/>
              <!-- <b-tooltip target="tooltip-target-6" triggers="hover">
                        Add Contact
             </b-tooltip> -->
          </b-col>
        </b-row>
      </div>     
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import { makeOutboundCall } from '../../../lib/CallActions'

export default {
    name: 'CallContacts',
    components : {

    },
    data() {
      return {
          contactTabSelected : false,
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
          console.log(name,number)
            makeOutboundCall(name,number)
            this.$store.dispatch("call/updateCallerName",name)
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
        },
        callLog(){
           
        var result = this.callLogs.reduce((unique, o) => {
            if(!unique.some(obj => obj.calledTime === o.calledTime)) {
              unique.push(o);
            }
            return unique;
        },[]);
        return result
        }
        
    },
    computed: {
        ...mapGetters([
        'callLogs',
        'contactList',
        'dialedNumber'
        ])
    }
}
</script>

<style scoped>

.tab-head-home {
  color: #2c5cc5;
  font-size: 12px;
  cursor: pointer;
}

.tab-head-home-active {
  border-bottom: solid 2px #2c5cc5;
}

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
  -ms-overflow-style:none;
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
.no-contact-found {
  
  text-align: center;
  margin-top: 30px;
}

.hovertext {
  position: relative;
  border-bottom: 1px dotted black;
}

.hovertext:before {
  content: attr(data-hover);
  visibility: hidden;
  opacity: 0;
  width: 140px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px 0;
  transition: opacity 1s ease-in-out;

  position: absolute;
  z-index: 1;
  left: 0;
  top: 110%;
}

.hovertext:hover:before {
  opacity: 1;
  visibility: visible;
}
</style>
