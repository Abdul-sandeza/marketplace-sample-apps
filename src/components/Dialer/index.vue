<template>
  <div>

    <div class="dialer-container">
      <b-row style="width:100%;margin-right: 0px;margin-left: 0px;">
        <b-col cols="2" style="border-right: 1px solid #264966;"> 
          <vue-country-code class="country-select" 
                      @onSelect="onSelect" 
                      :defaultCountry="countryCode.country"
                      :enabledCountryCode=false
                      :disabledFetchingCountry=true 
                      :preferredCountries="['us', 'gb']"
                      :onlyCountries="dialable_countries"
                  > 
                  </vue-country-code>
        </b-col>
        <b-col cols="8"> <b-form-input class="dial-pad-number" v-model="number"  type="number"   placeholder="Type Phone Number"></b-form-input></b-col>
        <b-col cols="2">
          <font-awesome-icon class="dialer-call-button " icon="phone-alt" @click="MakeOutboundCall()" size="lg"/>
        </b-col>
      </b-row>
      <!-- <b-input-group class="dial-pad-top">
          <b-input-group-prepend>
                  <vue-country-code class="country-select" 
                      @onSelect="onSelect" 
                      :defaultCountry="countryCode.country"
                      :enabledCountryCode=true
                      :disabledFetchingCountry=true 
                      :preferredCountries="['us', 'gb']"
                      :onlyCountries="dialable_countries"
                  > 
                  </vue-country-code>
          </b-input-group-prepend>

          <b-form-input class="dial-pad-number" v-model="number"  type="text"></b-form-input>

          <b-button class="dial-pad-button"  variant="outline-light">
              <font-awesome-icon icon="th" @click="dialPadToggle()" size="lg"/>
          </b-button>
          <b-button  variant="secondary">
          <font-awesome-icon style="color:#fff" icon="phone" @click="MakeOutboundCall()" size="lg"/>
          </b-button>
      </b-input-group> -->

    </div>
    
    <div v-if="dialpadToggle" class="key-pad">
      <b-row >
        <b-col cols="4" @click="keyDial('1')" class="key"> 
          <span class="number"> 1 </span> 
          <span class="alphabet">  </span>
        </b-col>
        <b-col cols="4" @click="keyDial('2')" class="key"> 
          <span class="number"> 2 </span> 
          <span class="alphabet"> ABC </span>
        </b-col>
        <b-col cols="4" @click="keyDial('3')" class="key"> 
          <span class="number"> 3 </span> 
          <span class="alphabet"> DEF </span>
        </b-col>
      </b-row>
      <b-row >
        <b-col cols="4" @click="keyDial('4')" class="key"> 
          <span class="number"> 4 </span> 
          <span class="alphabet"> GHI </span>
        </b-col>
        <b-col cols="4" @click="keyDial('5')" class="key"> 
          <span class="number"> 5 </span> 
          <span class="alphabet"> JKL </span>
        </b-col>
        <b-col cols="4" @click="keyDial('6')" class="key"> 
          <span class="number"> 6 </span> 
          <span class="alphabet"> MNO </span>
        </b-col>
      </b-row>
      <b-row >
        <b-col cols="4" @click="keyDial('7')" class="key"> 
          <span class="number"> 7 </span> 
          <span class="alphabet"> PQRS </span>
        </b-col>
        <b-col cols="4" @click="keyDial('8')" class="key"> 
          <span class="number"> 8 </span> 
          <span class="alphabet"> TUV </span>
        </b-col>
        <b-col cols="4" @click="keyDial('9')" class="key"> 
          <span class="number"> 9 </span> 
          <span class="alphabet"> WXYZ </span>
        </b-col>
      </b-row>
      <b-row >
       <b-col cols="4" > 
          <span class="number">  </span> 
          <span class="alphabet">  </span>
        </b-col> 
        <b-col cols="4" @click="keyDial('0')" class="key"> 
          <span class="number"> 0 </span> 
          <span class="alphabet"> </span>
        </b-col>
        <b-col cols="4" > 
          <span class="number"> </span> 
          <span class="alphabet"> </span>
        </b-col>
      </b-row>
    </div>  


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import { makeOutboundCall , onAddConference } from "./../../lib/CallActions"
import { checkThirdPartyStatus } from "../../lib/ContactRefresh"

export default {
  name: 'Dialer',
  data() {
    return {
      number : "",
      dialPadToggleStatus: true
    }
  },
  created() {
  },
  methods: {
    onSelect({name, iso2, dialCode}) {
      console.log(name, iso2, dialCode);
      this.$store.dispatch("call/setCountryCode" , { country : name , code : "+" + dialCode })
    },
    keyDial(number) {
      this.number = this.number + number
    },
    async MakeOutboundCall() {
      if(this.number >= 10) {
        if(this.pageroute == 'home') {
          makeOutboundCall("Unknown Caller" , this.countryCode.code + this.number); 
          this.$store.dispatch("actions/setOutboundCall", true)
        } else {
          await onAddConference("number",this.countryCode.code + this.number)
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
      }
    }
   
  },
  computed: {
    ...mapGetters([
        'dialable_countries',
        'homeSubNav',
        'callSubNav',
        'countryCode',
        'pageroute',
        'dialpadToggle'
    ])
  }
}
</script>

<style>

.vue-country-select {
  border: none !important;
  font-size: 18px;
}

.vue-country-select .dropdown {
  padding: 0px !important;
  margin-top: 7px !important;
}

.vue-country-select .dropdown:hover {
    background-color: transparent !important;
}
</style>

<style scoped>

.key {
  cursor: pointer;
}

.key-pad {
  /* height: 250px;
  padding: 20px 52px 10px 52px;
  position: fixed;
  bottom: 220px;
  background: #fff;
  box-shadow: 0 -2px 4px rgb(0 0 0 / 8%);
  width: 369px;
  margin: 0px -10px;
  left: 0;
  z-index: 2; */

  height: 250px;
    padding: 20px 52px 10px 52px;
    position: fixed;
    bottom: 41px;
    background: #fff;
    box-shadow: 0 -2px 4px rgb(0 0 0 / 8%);
    width: 358px;
    margin: 0 -10px;
    z-index: 2;
}

.key-set {
  padding: 10px;
}

.key-set :hover {
  background-color: #ebeff3;
  cursor:pointer;
}

.key .number {
  color: #12344d;
  font-size: 24px;
}

.key .alphabet {
  color: #475867;
  font-size: 10px;
}

.key-pad span {
  display: block;
  text-align: center;
}


.dialer-container {

  background-color: #12344D;
  display: flex;
  align-items: center;
  height: 56px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%), 0 0 4px 0 rgb(0 0 0 / 10%);
  font-size: 14px;
  color: #fff;
  margin: -10px -10px 5px -10px;
  
}

.dialer-call-button {
    color: rgb(255, 255, 255);
    background: #00a886;
    font-size: 35px;
    padding: 10px;
    border-radius: 50%;
}

.dialer-call-button:hover{
  background: #6fdfc8;
}


.dial-pad-country-code {
    border: 1px solid #ccc;
    border-right: none;
    margin-right: -5px !important;
    border-radius: 0px;
    color: #495057;
}

.dial-pad-number {
    border: none;
    background: transparent;
    color: #fff;
}

.dial-pad-number:focus {
    outline: none !important;
    box-shadow: none !important;
    border: 1px solid #ccc !important;
    border: none !important;
}

.dial-pad-button {
    border: 1px solid #ccc;
    border-left: none;
    margin-left: -5px;
    border-radius: 0px;
    color:#ccc;
}

.dial-pad-button:hover {
    background: #ffffff;
    border: 1px solid #ccc;
    border-left: none;
    color:#6c757d !important;
}

.dial-pad-button:active {
    background: #ffffff !important;
    border: 1px solid #ccc !important;
    color: #00425f !important;
    border-left: none;
    color: #6c757d !important;
}


.dialpad-container {
  text-align: center;
  margin-top: 50px;
}

.button-row {
  margin-top: 10px;
}

 .dialpad-button {
    width: 23%;
    height: 65px;
    margin-right: 5px;
    margin-left: 5px;
  }

  .dialpad-number {
    font-size: 19px;
    font-weight: bold;
  }

  .dialpad-letters{
    font-size: 13px;
    color: #ccc;
  }

  .dialpad-filler {
    visibility: hidden;
  }

  input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button { 
	-webkit-appearance: none;
}
</style>
