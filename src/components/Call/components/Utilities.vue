<template>
  <div>
    <b-card no-body>
      <b-tabs small content-class="mt-3" fill pills>
        <b-tab no-body title="Notes" active>
          <template slot="title">
            <font-awesome-icon title="Notes" icon="sticky-note" size="lg" />
          </template>
          <b-form-textarea
            id="textarea-no-resize"
            placeholder="Enter your notes here"
            rows="3"
            no-resize
            v-model="editorText"
          ></b-form-textarea>
          <hr />
          <div class="d-flex justify-content-center" style="margin:0 0 1rem">
            <b-button
              @click="saveNotes"
              size="sm"
              variant="primary"
              style="margin:0 0.6rem"
              >Save</b-button
            >
            <b-button
              @click="clearNotes"
              size="sm"
              variant="danger"
              style="margin:0 0.6rem"
              >Cancel</b-button
            >
          </div>
        </b-tab>

        <b-tab no-body title="Client Loyality Management">
          <template slot="title">
            <font-awesome-icon
              title="Client Loyality Management"
              icon="hands-helping"
              size="lg"
            />
          </template>

          <b-table-simple>
            <b-tbody>
              <b-tr>
                <b-th class="text-center">Points</b-th>
                <b-td variant="success" class="text-center">xxxxx</b-td>
              </b-tr>
              <b-tr>
                <b-th class="text-center">Incentives</b-th>
                <b-td variant="warning" class="text-center">xxxxx</b-td>
              </b-tr>
              <b-tr>
                <b-th class="text-center">Discount</b-th>
                <b-td class="text-center" variant="danger">xxxxx</b-td>
              </b-tr>
              <b-tr>
                <b-th class="text-center">Benefit</b-th>
                <b-td class="text-center" variant="primary">xxxxx</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-tab>

        <b-tab no-body title="Lead Qualificaion and Scoring">
          <template slot="title">
            <font-awesome-icon
              title="Lead Qualificaion and Scoring"
              icon="money-check-alt"
              size="lg"
            />
          </template>

          <b-table-simple>
            <b-tbody>
              <b-tr>
                <b-th class="text-center">Validity</b-th>
                <b-td class="text-center" variant="success">xxxxx</b-td>
              </b-tr>
              <b-tr>
                <b-th class="text-center">Scores</b-th>
                <b-td class="text-center" variant="warning">xxxxx</b-td>
              </b-tr>
              <b-tr>
                <b-th class="text-center">Redeem</b-th>
                <b-td class="text-center" variant="danger">xxxxx</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'amazon-connect-streams'
import 'amazon-connect-chatjs'
import store from '../../../store'

export default {
  name: 'IncomingCall',
  data() {
    return {
      editorText: '',
    }
  },
  methods: {
    saveNotes() {
      var passData = {}
      passData.action = 'CREATE_NOTE'
      passData.editorText = this.message_notes
      passData.contactId = store.getters.contact_id
      passData.callerName = store.getters.caller_name
      passData.callerNumber = store.getters.caller_number
      passData.callerId = store.getters.caller_id
      parent.postMessage(passData, '*')
    },
    createTicket() {
      this.$store.dispatch('ticket/toggleTicketButton', true)
      var passData = {}
      passData.action = 'CREATE_TICKET'
      passData.contactId = this.caller_id
      passData.phoneNumber = this.caller_number
      passData.agentId = this.agent_username

      console.log(passData)
      parent.postMessage(passData, '*')
      this.$store.dispatch('ticket/setSelectedTicket', ticketId)
    },
    openTicket(ticketId) {
      var passData = {}
      passData.action = 'OPEN_TICKET'
      passData.ticketId = ticketId
      console.log(passData)
      parent.postMessage(passData, '*')
      this.$store.dispatch('ticket/setSelectedTicket', ticketId)
    },
    cancelEditor() {
      this.$store.dispatch('ticket/toggleEditor', false)
      this.$store.dispatch('ticket/toggleNoteButton', false)
    },
    createNote(ticketId) {
      var passData = {}
      passData.action = 'SELECT_TICKET'
      passData.agentId = this.agent_username
      passData.ticketId = ticketId
      console.log(passData)
      parent.postMessage(passData, '*')

      this.$store.dispatch('ticket/setSelectedTicket', ticketId)
      this.$store.dispatch('ticket/toggleNoteButton', false)
      this.$store.dispatch('ticket/toggleEditor', true)
    },
    createNoteSubmit() {
      this.$store.dispatch('ticket/toggleNoteButton', true)
      var passData = {}
      passData.action = 'CREATE_NOTE'
      passData.ticketId = this.selectedTicket
      passData.note = this.editorText
      console.log(passData)
      parent.postMessage(passData, '*')
    },
    validated() {
      console.log('validaity', !this.editorText.length)
      if (!this.editorText.length) {
        return ''
      } else {
        return 'Save Notes'
      }
    },
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
      'agent_username',
    ]),
  },
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

.call-create-ticket {
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
  padding: 5px 0;
}
</style>
