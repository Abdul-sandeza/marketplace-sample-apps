import store from '../store'
import dayjs from 'dayjs'
import { websocketConnection } from '../lib/WebSocket';

export default function callTriggers() {

    connect.contact(function(contact) {

        if(contact.getAgentConnection().getMediaType() === connect.MediaType.SOFTPHONE){
    
            contact.onIncoming(function(contact) { 
                console.log("on incomming ---------")
                store.dispatch("call/updateCallState", "INCOMING");
                store.dispatch("common/routePage", "call");
            });
        
            contact.onConnecting(function(contact) { 

                store.dispatch("call/updateCallState", "CONNECTING");
                store.dispatch("common/routePage", "call");

                var activeConnection = contact.getActiveInitialConnection();
                var contactId = activeConnection['contactId'];
                var connectionId = activeConnection['connectionId'];
                var conn = new connect.Connection(contactId, connectionId);
                conn.getEndpoint().phoneNumber;

                store.dispatch("call/updateCallerNumber", conn.getEndpoint().phoneNumber);

                console.log(contact.getAttributes())

                store.dispatch("call/setContactId", contactId);
                websocketConnection(contactId)
                store.dispatch("call/setContactAttributes", contact.getAttributes());
                store.dispatch("ticket/setTickets", contact.getAttributes());

                let passData = {};
                passData.action = "INCOMING_CALL";
                passData.agentId = store.getters.agent_username;
                passData.callerName = store.getters.caller_name;
                passData.callerNumber = store.getters.caller_number;
                passData.callerId = store.getters.caller_id;
                passData.contactAttributes = store.getters.contact_attributes;
                passData.calledTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
                console.log(passData)
                parent.postMessage(passData,"*");
                
                console.log("on connecting ---------")
            });
        
            contact.onAccepted(function(contact) {
                store.dispatch("common/routePage", "call"); 
                console.log("on onAccepted ---------")
                store.dispatch("call/updateCallState", "ACCEPTED");
            });
        
            contact.onConnected(function(contact) {
                store.dispatch("common/routePage", "call"); 
                console.log("on onConnected ---------")
                store.dispatch("call/updateCallState", "CONNECTED");
                store.dispatch("call/updateOnDestroyedFlag",true);

                if(store.getters.outboundCall) {
                    console.log(contact.getAttributes())
                    store.dispatch("call/setContactAttributes", contact.getAttributes());
                    store.dispatch("ticket/setTickets", contact.getAttributes());

                    let passData = {};
                    passData.action = "CALL_LOGS"
                    passData.callType = "outgoing"
                    passData.agentId = store.getters.agent_username;
                    passData.callerName = store.getters.caller_name;
                    passData.callerNumber = store.getters.caller_number;
                    passData.callerId = store.getters.caller_id;
                    passData.calledTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    console.log(passData)
                    parent.postMessage(passData,"*");
                    store.dispatch("common/pushCallLogs", passData);

                    // to store ticket details in localstorage
                    passData = {};
                    passData.action = "OUTGOING_CALL";
                    passData.agentId = store.getters.agent_username;
                    passData.callerName = store.getters.caller_name;
                    passData.callerNumber = store.getters.caller_number;
                    passData.callerId = store.getters.caller_id;
                    passData.contactAttributes = store.getters.contact_attributes;
                    passData.calledTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    console.log(passData)
                    parent.postMessage(passData,"*");
                } else {
                    let passData = {};
                    passData.action = "CALL_LOGS"
                    passData.callType = "incoming"
                    passData.agentId = store.getters.agent_username;
                    passData.callerName = store.getters.caller_name;
                    passData.callerNumber = store.getters.caller_number;
                    passData.callerId = store.getters.caller_id;
                    passData.calledTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    console.log(passData)
                    parent.postMessage(passData,"*");
                    store.dispatch("common/pushCallLogs", passData);
                }

            });
        
            contact.onMissed(function(contact) { 
                store.dispatch("common/routePage", "call");
                console.log("on onMissed ---------")
                store.dispatch("call/updateCallState", "MISSED");

                let passData = {};
                passData.action = "CALL_LOGS"
                passData.callType = "missed"
                passData.agentId = store.getters.agent_username;
                passData.callerName = store.getters.caller_name;
                passData.callerNumber = store.getters.caller_number;
                passData.callerId = store.getters.caller_id;
                passData.calledTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
                console.log(passData)
                parent.postMessage(passData,"*");
                store.dispatch("common/pushCallLogs", passData);
            });
        
            contact.onEnded(function(contact) { 
                console.log("on onEnded ---------")
                let callState = store.getters.call_state;
                if(callState != "ACW" && callState != "MISSED") {
                    store.dispatch("call/updateCallState", "ENDED");
                }
            });
        
            contact.onACW(function(contact) { 
                store.dispatch("common/routePage", "call");
                console.log("on onACW ---------")
                store.dispatch("call/updateCallState", "ACW");
            });
        
            contact.onDestroy(function(contact) { 
                store.dispatch("common/routePage", "call");
                console.log("on onDestroy ---------")
                store.dispatch("call/updateCallState", "DESTROYED");
                store.dispatch("actions/setOutboundCall", false)
                store.dispatch("common/routePage", "home");
                if(store.getters.on_destroyed_flag == true){
                    let passData = {};
                    passData.action = "ENDED_CALL"
                    passData.agentId = store.getters.agent_username;
                    passData.ticketId = store.getters.selectedTicket;
                    passData.contactId = store.getters.contact_id;
                    passData.callerName = store.getters.caller_name;
                    passData.callerNumber = store.getters.caller_number;
                    passData.callerId = store.getters.caller_id;
                    passData.calledTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    console.log(passData)
                    parent.postMessage(passData,"*");
                    store.dispatch("call/updateOnDestroyedFlag",false)
                }
            });
        }
    
    });
    
}