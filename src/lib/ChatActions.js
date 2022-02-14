import store from '../store'

export function onAcceptChat() {

    let agent = new connect.Agent();

   
    let contact = agent.getContacts(connect.ContactType.CHAT);

  


    console.log(contact)

    let current_contact = 0;

    if(contact.length != 0) {
        current_contact = contact.length - 1
    }

    console.log(current_contact)

    contact[current_contact].accept({
        success: function() { 
            console.log("Accepted")
        },
        failure: function(err) { 
            console.log(err)
        }
     });



  
}

export function onDeclineChat() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.CHAT);

    let current_contact = 0;

    if(contact.length != 0) {
        current_contact = contact.length - 1
    }

    contact[current_contact].reject({
        success: function() { 
            console.log("rejected")
        },
        failure: function(err) { 
            console.log(err)
        }
     });
  
}


export function onSendMessage(message) {

    let agent = new connect.Agent();

    let contacts = agent.getContacts(connect.ContactType.CHAT);

    console.log(contacts);

    for( let contact in contacts) {

        if(contacts[contact].contactId === message.contactId ) {

            contacts[contact].getAgentConnection().getMediaController().then(async (controller) => {

                controller.sendMessage( { message : message.data.message , contentType : message.data.contentType }).then((res, req) => {
                console.log("---###----")
                    console.log(res)
                });

            });
        }

    }

}

export function onEndChat(contactId) {

    console.log("end chat called")

    let agent = new connect.Agent();

    let contacts = agent.getContacts();

    console.log(contacts);
    if(contacts.length == 0){
        
                let passData = {}
                passData.action = "CHAT_DISCONNECT";
                passData.status = "success"
                passData.contactId = contactId;
                passData.agentId = store.getters.agent_username
                parent.postMessage(passData,"*");
             }
          
        
    

    for( let contact in contacts) {

        console.log(contacts[contact].contactId , contactId)
        if(contacts[contact].contactId == contactId ) {

            contacts[contact].getInitialConnection().destroy({
                success: () => { 
                    let passData = {}
                    passData.action = "CHAT_DISCONNECT";
                    passData.status = "success"
                    passData.contactId = contactId;
                    passData.agentId = store.getters.agent_username
                    console.log(passData)
                    parent.postMessage(passData,"*");
                 },
                failure: (err) => { 
                    let passData = {}
                    passData.action = "CHAT_DISCONNECT";
                    passData.status = "fail"
                    passData.contactId = contactId;
                    passData.agentId = store.getters.agent_username
                    parent.postMessage(passData,"*");
                 }
            });

        }else if(contacts[contact].contactId != contactId ) {
             
                        let passData = {}
                        passData.action = "CHAT_DISCONNECT";
                        passData.status = "success"
                        passData.contactId = contactId;
                        passData.agentId = store.getters.agent_username
                        console.log(passData)
                        parent.postMessage(passData,"*");
                     }
                 
                     
                

        

    }

    

}

export function onClearChat(contactId) {

    console.log("clear chat called")

    let agent = new connect.Agent();

    let contacts = agent.getContacts();

    console.log(contacts);

    if(contacts.length == 0){
        
        let passData = {}
        passData.action = "CHAT_CLEAR";
        passData.status = "success"
        passData.contactId = contactId;
        passData.agentId = store.getters.agent_username
        parent.postMessage(passData,"*");
     }
  

    for( let contact in contacts) {

        console.log(contacts[contact].contactId , contactId)
        if(contacts[contact].contactId == contactId ) {

            contacts[contact].clear({
                success: () => { 
                    let passData = {}
                    passData.action = "CHAT_CLEAR";
                    passData.status = "success"
                    passData.contactId = contactId;
                    passData.agentId = store.getters.agent_username
                    parent.postMessage(passData,"*");
                 },
                failure: (err) => { 
                    let passData = {}
                    passData.action = "CHAT_CLEAR";
                    passData.status = "fail"
                    passData.contactId = contactId;
                    passData.agentId = store.getters.agent_username
                    parent.postMessage(passData,"*");
                 }
            });

        }else if(contacts[contact].contactId != contactId ) {
             
            let passData = {}
            passData.action = "CHAT_CLEAR";
            passData.status = "success"
            passData.contactId = contactId;
            passData.agentId = store.getters.agent_username
            console.log(passData)
            parent.postMessage(passData,"*");
         }
     

    }

    

}