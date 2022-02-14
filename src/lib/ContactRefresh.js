import store from '../store'

export function contactRefresh() {

    let agent = new connect.Agent();
    let eventBus = connect.core.getEventBus();

    eventBus.subscribe(connect.ContactEvents.REFRESH, function () {

        let voiceContact = agent.getContacts(connect.ContactType.VOICE)[0];

        // console.log( "Voice contact => " + agent.getContacts(connect.ContactType.VOICE).length)
        // console.log( "Chat contact => " + agent.getContacts(connect.ContactType.CHAT).length)

        //console.log(voiceContact.getState())

        if(agent.getContacts(connect.ContactType.VOICE).length > 0) { 
            
            let contactState = voiceContact.getState();

            let initialConnection = voiceContact.getActiveInitialConnection();

            // console.log("connecting =>" + initialConnection.isConnecting())
            // console.log("connected =>" + initialConnection.isConnected())

            store.dispatch("call/updateHoldStatus", initialConnection.isOnHold());

            let thirdPartyConnection = voiceContact.getSingleActiveThirdPartyConnection();
            if(thirdPartyConnection != null ) {
                store.dispatch("call/updateThirdPartyHoldStatus", thirdPartyConnection.isOnHold());
            }

            if(contactState.type == "connected") {
                if(initialConnection != null && thirdPartyConnection != null) {
                    store.dispatch("call/setCallType", "conference");
                } else {
                    store.dispatch("call/setCallType", "normal");
                }
            } else {
                store.dispatch("call/setCallType", "normal");
            }

        }

        // console.log(contact.toSnapshot())

        // console.log(contact.getConnections(connect.ContactType.CHAT));

        // console.log(contact.getInitialConnection(connect.ContactType.CHAT))

        // console.log(contact.getActiveInitialConnection(connect.ContactType.CHAT))

        // console.log(contact.getThirdPartyConnections(connect.ContactType.CHAT))

        // console.log(contact.getSingleActiveThirdPartyConnection(connect.ContactType.CHAT))

        // console.log(contact.getAgentConnection(connect.ContactType.CHAT))
    });
  
}

export function checkThirdPartyStatus() {

    let agent = new connect.Agent();
    let eventBus = connect.core.getEventBus();

    return new Promise((resolve,reject)=>{

        eventBus.subscribe(connect.ContactEvents.REFRESH, function () {
            console.log(agent.getContacts())
    
            let contact = agent.getContacts()[0];
    
            try {
                let thirdParty = contact.getSingleActiveThirdPartyConnection();
                if(thirdParty && thirdParty.isConnecting()){
                  console.log("Transfer not COnnected");
                }
                if(thirdParty && thirdParty.isConnected()){
                    console.log("Transfer COnnected");
                    this.unsubscribe();
                    resolve("success")
                }
              } catch (e) {
                    resolve("fail")
                    console.error("Error in addConnection:OnRefresh. " + e.message);
              }
    
        });

    })
}