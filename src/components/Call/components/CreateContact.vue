<template>
  <div>
    <b-card no-body>
      <b-tabs small content-class="mt-3" fill pills>
        <b-tab title="Contact Menu">
          <template slot="title">
            <font-awesome-icon
              title="Contact Menu"
              icon="address-card"
              size="lg"
            />
          </template>

          <div>
            <!-- <b-button
              @click="contactPage"
              href="#"
              variant="primary"
              size="sm"
              style="margin:0 6.5rem"
              >Create contact</b-button
            > -->
            <div style="margin:0 7rem">
              <b-button
                size="sm"
                pill
                @click="createNewContact()"
                :disabled="buttonStatus"
                style="margin-right:5px "
                variant="success"
              >
                Create Contact
              </b-button>
            </div>
            <hr />
            <p class="font-weight-lighter text-center">
              Note: You will be redirected to the Freshwork CRM contact menu for
              adding all of the information of this unknown caller
            </p>
          </div>
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
  name: 'CreateContact',
  components: {},
  data() {
    return {}
  },
  methods: {
    createNewContact() {
      var passData = {}
      passData.action = 'CREATE_CONTACT_CALL'
      parent.postMessage(passData, '*')
    },
  },
  computed: {
    ...mapGetters(['homeSubNav']),
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
