<template>
    <div>
        <b-form-group
        id="contactName"
        label="Contact Name"
        label-for="contactName"
        :invalid-feedback="nameInvalidFeedback"
        :state="nameState"
        >
        <b-form-input id="contactName" v-model="contactName" size="sm" :state="nameState" trim></b-form-input> </b-form-group>

        <b-form-group
        id="contactNumber"
        label="Contact Number"
        label-for="contactNumber"
        :invalid-feedback="contactInvalidFeedback"
        :state="numberState"
        >
        <b-form-input id="contactNumber" v-model="saveNumber" size="sm" :disabled="true" :state="numberState" trim></b-form-input>
        </b-form-group>

        <div class="call-handle-buttons-container">
        <b-button size="sm" pill @click="cancelCreateNewContact()" class="call-handle-buttons" variant="danger">
                Cancel
        </b-button>
        <b-button size="sm" pill @click="createNewContact()" :disabled="buttonStatus" class="call-handle-buttons" style="margin-left:5px" variant="success">
                {{ buttonText }}
        </b-button>
    </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"

export default {
    name: 'SaveContact',
    components : {

    },
    data() {
        return {
            buttonText : "Add Contact",
            buttonStatus : false,
            contactName : ""
        }
    },
    created() {
        
    },
    mounted() {

    },
    methods: {
        createNewContact() {
            if(this.contactName.length > 4) {
                this.buttonText = "Saving";
                this.buttonStatus = true;
                var passData = {};
                passData.action = "CREATE_CONTACT";
                passData.contactName = this.contactName;
                passData.contactNumber = this.saveNumber
                parent.postMessage(passData,"*");
            } else {
                console.log("name length")
            }
        },
        cancelCreateNewContact() {
            this.$store.dispatch("actions/homeSubNavigation", "home")
        }
    },
    computed: {
        nameState() {
            return this.contactName.length >= 4 ? true : false
        },
        numberState() {
            return this.saveNumber.length >= 10 ? true : false
        },
        nameInvalidFeedback() {
            if (this.contactName.length > 4) {
                return ''
            } else if (this.contactName.length > 0) {
                return 'Enter at least 4 characters'
            }
        },
        contactInvalidFeedback() {
            if (this.saveNumber.length > 10) {
                return ''
            } else if (this.saveNumber.length > 0) {
                return 'Enter valid phone number'
            }
        },
        ...mapGetters([
        'saveNumber',
        ])
    }
}
</script>

<style scoped>



</style>

