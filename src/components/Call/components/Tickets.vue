<template>    
    <div>
        <div v-if="!editor">
            <b-row >
                <b-col cols="6">
                <h6  class="incoming-ticket-heading"> Open Tickets </h6>
                </b-col>
                <b-col cols="6">
                <b-button @click="createTicket()" :disabled="ticketButtonStatus" pill size="sm" class="call-create-ticket" variant="primary"><font-awesome-icon v-if="!ticketButtonStatus" icon="plus" size="sm"/> {{ ticketButtonStatus ? "Creating" : "New Ticket" }}</b-button>   
                </b-col>
            </b-row>
            <div class="tickets-list">
                <b-row :key= "index" v-for="(ticket,index)  in  tickets" class="ticket-history-row">
                    <b-col cols="12">
                        <b-row>
                        <b-col cols="6">
                            <p @click="openTicket(ticket.id)" class="ticket-values ticket-values-name" > <strong>#</strong> {{ ticket.id }}</p>
                        </b-col>
                        <b-col cols="6">
                            <b-button @click="createNote(ticket.id)" pill size="sm" class="call-addnote-ticket" variant="outline-secondary"><font-awesome-icon  icon="plus" size="sm"/> Note</b-button>
                        </b-col>
                        </b-row>
                        <p class="ticket-values ticket-values-number">{{ ticket.subject}}</p>
                    </b-col>
                </b-row>
            </div>
        </div>

        <div v-if="editor">
            <b-row >
                <b-col cols="5">
                <h6  class="incoming-ticket-heading">For #{{selectedTicket}}</h6>
                </b-col>
                <b-col cols="7">
                <b-button v-if="editorText.length" @click="createNoteSubmit()" :disabled="noteButtonStatus" pill size="sm" class="call-create-ticket" variant="outline-success"><font-awesome-icon icon="plus" size="sm"/> {{ noteButtonStatus?"Saving":"Save Notes"}}  </b-button>
                <b-button @click="cancelEditor()" pill size="sm" class="call-create-ticket" variant="outline-danger"><font-awesome-icon  icon="chevron-left" size="sm"/> Cancel</b-button>
                </b-col>
            </b-row>
            <div style="margin-top: 10px" class="editor-textarea">
                <b-form-textarea
                id="textarea"
                v-model="editorText"
                placeholder="Enter Notes"
                rows="8"
                max-rows="8"
                ></b-form-textarea>
            </div>  
        </div> 
    </div> 

</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import store from '../../../store';

export default {
  name: 'IncomingCall',
  data() {
    return {
        editorText : ""
    }
  },
  methods: {
    createTicket(){
      this.$store.dispatch("ticket/toggleTicketButton",true)
      var passData = {};
      passData.action = "CREATE_TICKET";
      passData.contactId = this.caller_id;
      passData.phoneNumber = this.caller_number;
      passData.agentId = this.agent_username;
    
      console.log(passData)
      parent.postMessage(passData,"*");
      this.$store.dispatch("ticket/setSelectedTicket",ticketId)
    },
    openTicket(ticketId){
      
      var passData = {};
      passData.action = "OPEN_TICKET";
      passData.ticketId = ticketId;
      console.log(passData)
      parent.postMessage(passData,"*");
      this.$store.dispatch("ticket/setSelectedTicket", ticketId);
    },
    cancelEditor(){
      this.$store.dispatch("ticket/toggleEditor",false)
      this.$store.dispatch("ticket/toggleNoteButton",false)
    },
    createNote(ticketId) {
      var passData = {};
      passData.action = "SELECT_TICKET";
      passData.agentId = this.agent_username
      passData.ticketId = ticketId;
      console.log(passData)
      parent.postMessage(passData,"*");

      this.$store.dispatch("ticket/setSelectedTicket",ticketId)
      this.$store.dispatch("ticket/toggleNoteButton",false)
      this.$store.dispatch("ticket/toggleEditor",true)
    },
    createNoteSubmit() {
      this.$store.dispatch("ticket/toggleNoteButton",true)
      var passData = {};
      passData.action = "CREATE_NOTE";
      passData.ticketId = this.selectedTicket;
      passData.note = this.editorText;
      console.log(passData)
      parent.postMessage(passData,"*");
    },
    validated(){
      console.log("validaity",!this.editorText.length)
      if(!this.editorText.length){
        return ""
      }else{
        return "Save Notes"
      }
    }
  },
  computed: {
    ...mapGetters([
      'tickets',
      'editor',
      'caller_id',
      'caller_number',
      'selectedTicket',
      'ticketButtonStatus',
      'noteButtonStatus',
      'agent_username'
    ])
  }
}
</script>

<style scoped>

.call-addnote-ticket {
  float: right;
  height: 20px;
  font-size: 8px;
  margin-right: 5px;
}

.ticket-values {
  margin-bottom: 0px !important;
  text-align: left !important;
}

.ticket-values-name {
  font-size: 13px !important;
  cursor: pointer;
}

.ticket-values-name:hover {
  color: #2c5cc5;
}

.ticket-values-number {
  font-size: 12px !important;
}

.incoming-ticket-heading {
  margin-top: 10px;
  text-align: left;
  font-weight: bold;
}

.call-create-ticket{
  float: right;
  height: 25px;
  font-size: 11px;
  margin-top: 6px;
  margin-right: 4px;
}

.tickets-list {
  height: 268px;
  overflow-x: hidden;
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.tickets-list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE and Edge */
.tickets-list {
  -ms-overflow-style: none;
}

.ticket-history-row {
  padding: 5px 0 ;
}

</style>
