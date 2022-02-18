import store from '../store'
import dayjs from 'dayjs'
import { websocketConnection } from '../lib/WebSocket';

var seconds = 0 
var minutes = 0
var hours = 0
var myInterval


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
                // websocketConnection(contactId)
                if(store.getters.on_outbound_flag == false){
                    store.dispatch("call/setContactAttributes", contact.getAttributes());

                }
                
                // store.dispatch("call/setContactAttributes", contact.getAttributes());
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
                let startStatus = contact.getState()
                let startTime = JSON.stringify(startStatus.timestamp)
                console.log("SARTTIME",startTime)
                store.dispatch("call/updateStartTime",startTime)
                if(store.getters.onSetTimerFlag == false ){
                    store.dispatch('call/updateOnSetTimerFlag',true)
                    startTimer()
                    console.log("SET TIMER CALLED")
                }
                
                

              

                if(store.getters.outboundCall) {
                    console.log(contact.getAttributes())
                    if(store.getters.on_outbound_flag == false){
                        store.dispatch("call/setContactAttributes", contact.getAttributes());

                    }
                    
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
                    store.dispatch("call/updateFsCallType",false)
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
                    store.dispatch("call/updateFsCallType",true)
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
                let millis = contact.getStateDuration()
                let endStatus = contact.getState()
                
                let endTime = JSON.stringify(endStatus.timestamp)
                store.dispatch("call/updateEndTime",endTime)
                console.log("THIS IS THE STATE DURATION",millis)
                if(callState != "ACW" && callState != "MISSED") {
                    store.dispatch("call/updateCallState", "ENDED");
                   
                }
                if(store.getters.onSetTimerFlag == true ){
                    store.dispatch('call/updateOnSetTimerFlag',false)
                    stopTimer()
                    console.log("STOP TIMER CALLED")
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
                store.dispatch('call/updateOnboundFlag',false)
                if(store.getters.on_destroyed_flag == true){
                    let passData = {};
                    passData.action = "ENDED_CALL"
                    passData.agentId = store.getters.agent_username;
                    passData.ticketId = store.getters.selectedTicket;
                    passData.contactId = store.getters.contact_id;
                    passData.callerName = store.getters.caller_name;
                    passData.callerNumber = store.getters.caller_number;
                    passData.callerId = store.getters.caller_id;
                    passData.start_time = store.getters.start_time;
                    passData.end_time = store.getters.end_time;
                    passData.callDuration = store.getters.callDuration;
                    passData.callType = store.getters.fs_call_type;
                    passData.calledTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    console.log(passData)
                    parent.postMessage(passData,"*");
                    store.dispatch("call/updateOnDestroyedFlag",false)
                }
            });
        }
    
    });







    
}

function startTimer(){
    console.log('TIMER STARTED')
    myInterval = setInterval(process,1000)
}

function stopTimer(){
    console.log('TIMER STOPPED')
    clearInterval(myInterval)
   
    console.log(myInterval)
    
    
    var min = Math.floor(myInterval / 60);
    var sec = myInterval - min * 60;
    var hrs = Math.floor(myInterval / 3600);
    sec = sec<10? '0'+ sec: JSON.stringify(sec)
    min = min<10?'0'+min: JSON.stringify(min)
    hrs = hrs<10?'0'+hrs:JSON.stringify(hrs)
    let callDuration = `${hrs}:${min}:${sec}`
    store.dispatch("call/updateCallDuration",callDuration)
    store.dispatch("call/updateHours","00")
    store.dispatch("call/updateSeconds","00")
    store.dispatch("call/updateMinutes","00")
    myInterval = 0
    seconds = 0
    minutes = 0
    hours = 0
 
   
 }


function process(){
       
    seconds+= 1;
    let displaySeconds = seconds<10? '0'+ seconds: JSON.stringify(seconds)
    let displayMinutes = minutes<10?'0'+minutes: JSON.stringify(minutes)
    let displayHours = hours<10?'0'+hours:JSON.stringify(hours)
    if(seconds > 59){
        
        minutes+=1
        seconds=0
    }
    if(minutes > 59){
        hours += 1; 
        minutes = 0;
        seconds = 0;

    }
    store.dispatch("call/updateHours",displayHours)
    store.dispatch("call/updateSeconds",displaySeconds)
    store.dispatch("call/updateMinutes",displayMinutes)
    console.log("START FUNCTION",displayHours,displayMinutes,displaySeconds)


}


