<template>
  <div class="ccp-container">
    <div id="defaultCCP" ref="containerDiv" style="display:none"/>
    <titlebar v-if="pageroute != 'login' "> </titlebar>
    <login v-if="pageroute == 'login' "> </login>
    <home v-if="pageroute == 'home' " > </home>
    <call v-if="pageroute == 'call' "> </call>
    <chat v-if="pageroute == 'chat' "> </chat>
    <profile v-if="pageroute == 'profile' "> </profile>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Login from './components/Login'
import Home from './components/Home';
import Call from './components/Call';
import Chat from './components/Chat';
import Titlebar from './components/Titlebar';
import Profile from './components/Profile'


import { mapGetters } from 'vuex'
import "amazon-connect-streams";
import "amazon-connect-chatjs"
import { onSendMessage , onEndChat , onClearChat} from "./lib/ChatActions"
import  { makeOutboundCall } from "./lib/CallActions"
import Freshsales from "./services/FreshsalesApi"
import Axios from "axios"
import Vue from 'vue';
import VueAxios from 'vue-axios'
Vue.use(Axios)


export default {
  name: 'App',
  components: {
    Login,
    Home,
    Call,
    Chat,
    Titlebar,
    Profile
  },
  computed: {
    ...mapGetters([
      'connect_instance',
      'region',
      'pageroute'
    ])
  },
  created(){
    let uri = window.location.search.substring(1); 
    let params = new URLSearchParams(uri);
    let details = {}
    details.connect_instance = params.get("instance");
    details.region = params.get("region");
    details.websocket_url = params.get("websocket_url");
    details.connect_alias = details.connect_instance.replace(/.+\/\/|www.|\..+/g, '')
    this.$store.dispatch("common/setInstanceDetails",details);

    
     
    

  },


  mounted(){

    let _this = this;

    window.addEventListener('message', function(event) {
        if(event.data.action == "SEND_MESSAGE") {
          onSendMessage(event.data)
        } else if(event.data.action == "END_CHAT") {
          onEndChat(event.data.data)
        } else if(event.data.action == "MAKE_OUTBOUND_CALL") {
          makeOutboundCall(event.data.name,event.data.number)
          console.log("OUTBOUND EVENTS========",event.data)
          _this.$store.dispatch("actions/setOutboundCall", true)
   
          _this.$store.dispatch("call/updateCallerName",event.data.name)
        } else if(event.data.action == "CLEAR_CHAT") {
          onClearChat(event.data.data)
        } else if(event.data.action == "CALL_CONTACT_LIST") {
          console.log("CALL_CONTACT_LIST=========",event)
          _this.$store.dispatch("call/setCountryCode",event.data.countrySelected)
          _this.$store.dispatch("common/setCallContactDetails",event.data)
        } else if(event.data.action == "CREATE_TICKET_STATUS") {
            if(event.data.status == "SUCCESS") {
              _this.$store.dispatch("ticket/pushTicket",event.data);
              _this.$store.dispatch("ticket/setSelectedTicket",event.data.ticketId)
              _this.$store.dispatch("ticket/toggleEditor",true)
              _this.$store.dispatch("ticket/toggleTicketButton",false)
              _this.$store.dispatch("ticket/toggleNoteButton",false)
            } else {
              _this.$store.dispatch("ticket/toggleTicketButton",false)
              _this.$store.dispatch("ticket/toggleNoteButton",false)
            }
        } else if(event.data.action == "CREATE_NOTE_STATUS") {
            if(event.data.status == "SUCCESS") {
              _this.$store.dispatch("ticket/toggleEditor",false)
              _this.$store.dispatch("ticket/toggleNoteButton",false)
            } else {
              _this.$store.dispatch("ticket/toggleNoteButton",false)
            }
        } else if(event.data.action == "CREATE_CONTACT_STATUS") {
            if(event.data.status == "SUCCESS") {
              _this.$store.dispatch("actions/homeSubNavigation", "home")
            } else {
              _this.$store.dispatch("actions/homeSubNavigation", "home")
            }
        } else if(event.data.action == "LANGUAGE_CHANGE") {
          console.log(event.data)
            _this.$store.dispatch("actions/setTranslationLang", event.data.data )
        }
    } , false);

    
    let loginUrl =  this.connect_instance;

    connect.core.initCCP(defaultCCP, {
      ccpUrl: loginUrl,
      loginPopup: true,             
      loginPopupAutoClose: true,
      region: this.region,          
      softphone:     {   
        allowFramedSoftphone : true  
      }
    });


    connect.agent( function(agent){
     
      let passData = {};
      passData.action = "AGENT_CONNECTED";
      passData.agentId = agent.getConfiguration().username;
      parent.postMessage(passData,"*");
     
     
    

      
      
      
    });

    
    var eventBus = connect.core.getEventBus();

    eventBus.subscribe(connect.AgentEvents.INIT, function () {
      _this.$store.dispatch('common/routePage', "home" );
    });
  },

 }
  

</script>

<style>
@import './assets/styles/common.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#defaultCCP {
		width: 300px; 
		height: 465px; 
		overflow: hidden;
	}
</style>
