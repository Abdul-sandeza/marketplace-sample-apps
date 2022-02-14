import store from '../store'
import dayjs from 'dayjs'

export default function chatTriggers() {

    connect.contact(function(contact) {


        if(contact.getAgentConnection().getMediaType() === connect.MediaType.CHAT){

            contact.getAgentConnection().getMediaController().then(async (controller) => {

                // const awsSdkResponse = await controller.getTranscript({
                //     maxResults: 100,
                //     sortOrder: "ASCENDING"
                // });

                // console.log(awsSdkResponse.data.Transcript);
                // console.log('BEFORE CONTROLLER>ONMESSAGE=========')

                controller.onMessage( (event) => {
                    // console.log('ON MESSAGE CONTROLLER>ONMESSAGE=========')
                //   console.log("----^ chat ^-----")
                //   console.log(event.chatDetails)
                //   console.log(event.data)
                  let passData = {}
                  passData.agentId = store.getters.agent_username;
                  passData.action = "INCOMING_MESSAGE"
                  passData.message = event.data
                  parent.postMessage(passData,"*");
                  //console.log(passData)
                //   console.log("----^ chat ^-----")
                })



                controller.getTranscript({ maxResults: 30, sortOrder: "DESCENDING"})
                    .then(response => {
                        // Array of Transcripts
                        response.data.Transcript.forEach(transcript => {
                        if (transcript.ParticipantRole === 'AGENT' && transcript.Type === 'MESSAGE') {
                           console.log('THIS IS AGENT TRANSCRIPTS======',transcript)
                        }
                        if (transcript.ParticipantRole === 'CUSTOMER' && transcript.Type === 'MESSAGE') {
                            // Customer messages
                            console.warn('THIS IS AGENT CUSTOMER======',transcript)
                        }
                    });
                    })
                    .catch(err => {
                        console.log('CHAT TRANSCRIPT',err)
                    })
            })
    
            contact.onIncoming(function(contact) { 
                console.log("on incoming ---------")
                store.dispatch("chat/updateChatState", "INCOMING");
                store.dispatch("common/routePage", "chat");
            });
        
            contact.onConnecting(function(contact) {
                console.log("on connecting ---------")
                //console.log(contact.getInitialConnection().getMediaInfo());
                //store.dispatch("chat/updateChatName",contact.getInitialConnection().getMediaInfo().originalInfo.customerName)
                store.dispatch("chat/updateChatDetails",contact.getAttributes())
                store.dispatch("chat/updateChatState", "CONNECTING");
                store.dispatch("common/routePage", "chat");

                let passData = {};
                passData.action = "INCOMING_CHAT"
                parent.postMessage(passData,"*");
                
            });
        
            contact.onAccepted(function(contact) {
                console.log("on onAccepted ---------")
                store.dispatch("chat/updateChatState", "ACCEPTED");
                
            });

            contact.onWeb
        
            contact.onConnected(function(contact) {
                console.log("on onConnected ---------")
                store.dispatch("chat/updateChatState", "CONNECTED");
                store.dispatch("common/routePage", "home");

                let passData = {};
                passData.action = "CONNECTED_CHAT"
                passData.agentId = store.getters.agent_username;
                passData.callerName = store.getters.chat_name;
                passData.callerEmail = store.getters.chat_email;
                passData.contactId = contact.getContactId();
                passData.contactAttributes = contact.getAttributes();
                console.log(passData)
                parent.postMessage(passData,"*");
            });
        
            contact.onMissed(function(contact) { 
                console.log("on onMissed ---------")
                store.dispatch("chat/updateChatState", "MISSED");

                let passData = {};
                passData.action = "MISSED_CHAT"
                passData.agentId = store.getters.agent_username;
                passData.callerName = store.getters.chat_name;
                passData.callerEmail = store.getters.chat_email;
                passData.contactId = contact.getContactId()
                console.log(passData)
                parent.postMessage(passData,"*");
            });
        
            contact.onEnded(function(contact) { 
                console.log("on onEnded ---------")
                let chatState = store.getters.chat_state;
                if(chatState != "ACW" && chatState != "MISSED") {
                    store.dispatch("chat/updateChatState", "ENDED");
                }
            });
        
            contact.onACW(function(contact) { 
                console.log("on onACW ---------")
                store.dispatch("chat/updateChatState", "ACW");
                let passData = {}
                passData.action = "CHAT_DISCONNECT";
                passData.status = "success"
                passData.agentId = store.getters.agent_username;
                passData.contactId = contact.getContactId();
                parent.postMessage(passData,"*");
                console.log(passData)
            });
        
            contact.onDestroy(function(contact) {
                console.log("on onDestroy ---------")
                store.dispatch("chat/updateChatState", "DESTROYED");
                store.dispatch("common/routePage", "home");
                let passData = {}
                passData.agentId = store.getters.agent_username;
                passData.action = "CHAT_CLEAR";
                passData.status = "success"
                passData.contactId = contact.getContactId();
                parent.postMessage(passData,"*");
                console.log(passData)
            });


            contact.onRefresh(function(contact){
                console.log("CHAT REFRESHED")
                
            })

           



        }
    
    });
    
}