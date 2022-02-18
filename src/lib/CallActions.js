import store from '../store'

export function makeOutboundCall(name,number) {

    console.log(name,number)

    let agent = new connect.Agent();

    let callNumber = connect.Endpoint.byPhoneNumber(number);
    
    agent.connect(callNumber, {
        success: () => {
            console.log("sent outbound call");
            store.dispatch('call/updateOnOutboundFlag',true)
        },
        failure: (err) => {
        console.log("Failed to send outbound call");
        console.log(err);
        }
    });
}

export function onAcceptCall() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    contact.accept({
        success: function() { 
            console.log("Accepted")
        },
        failure: function(err) { 
            console.log(err)
        }
     });
  
}

export function onDeclineCall() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    contact.reject({
        success: function() { 
            console.log("rejected")
        },
        failure: function(err) { 
            console.log(err)
        }
     });
  
}

export function onEndIntialCall() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    let connection = contact.getInitialConnection(connect.ContactType.VOICE);

    connection.destroy({
        success: function() { 
            console.log("call ended")
        },
        failure: function(err) { 
            console.log(err)
        }
     });
  
}

export function onEndThirdPartyCall() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    let connection = contact.getSingleActiveThirdPartyConnection(connect.ContactType.VOICE);

    connection.destroy({
        success: function() { 
            console.log("call ended")
        },
        failure: function(err) { 
            console.log(err)
        }
     });
  
}

export function onClearContacts() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    contact.clear()
  
}

export function onholdToggleInitialCall() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    let connection = contact.getInitialConnection();

    if(connection.isOnHold()) {

        connection.resume({
            success: function() { 
                console.log("intial conn resumed")
            },
            failure: function(err) { 
                console.log(err)
            }
        });

    } else {

        connection.hold({
            success: function() { 
                console.log("intial conn hold")
            },
            failure: function(err) { 
                console.log(err)
            }
        });
    }
  
}

export function onholdToggleThirdPartyCall() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    let connection = contact.getSingleActiveThirdPartyConnection();

    if(connection.isOnHold()) {

        connection.resume({
            success: function() { 
                console.log("third party conn resumed")
            },
            failure: function(err) { 
                console.log(err)
            }
        });

    } else {

        connection.hold({
            success: function() { 
                console.log("third party conn hold")
            },
            failure: function(err) { 
                console.log(err)
            }
        });
    }
  
}

export function onMuteToggle(status) {
    
    let agent = new connect.Agent();

    if(status) {
        agent.unmute()
    } else {
        agent.mute()
    }
  
}

// conference call 

export function onAddConference(type,number) {

    console.log(type,number)
    
    let agent = new connect.Agent();

    let contact = agent.getContacts()[0];

    let thirdParty;

    if(type == 'number') {
        thirdParty = connect.Endpoint.byPhoneNumber(number);
    } else {
        thirdParty = number
    }

    return new Promise((resolve,reject)=>{
        contact.addConnection(thirdParty,{
            success : () => {
                resolve("success")
            },
            failure : (err) => {
                resolve("fail")
                console.log(err)
            }
        })
    })  
}

export function onSwapCall() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    contact.toggleActiveConnections({
        success: () => { 
            console.log("call swapped")
        },
        failure: (err) => { 
            console.log("call swapp fail")
         }
     });
}

export function onJoinCall() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    contact.conferenceConnections({
        success: () => { 
            console.log("call joined")
        },
        failure: (err) => { 
            console.log("call join fail")
         }
     });
}

export function onHoldAll() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    let connection = contact.getInitialConnection();
    let thirdPartyConnection = contact.getSingleActiveThirdPartyConnection();

    if(!connection.isOnHold()) {

        connection.hold({
            success: function() { 
                console.log("intial conn hold")
            },
            failure: function(err) { 
                console.log(err)
            }
        });
    }

    if(!thirdPartyConnection.isOnHold()) {

        thirdPartyConnection.hold({
            success: function() { 
                console.log("third party conn hold")
            },
            failure: function(err) { 
                console.log(err)
            }
        });

    }
}

export function onResumeAll() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    let connection = contact.getInitialConnection();
    let thirdPartyConnection = contact.getSingleActiveThirdPartyConnection();

    if(connection.isOnHold()) {

        connection.resume({
            success: function() { 
                console.log("intial conn resumed")
            },
            failure: function(err) { 
                console.log(err)
            }
        });
    }

    if(thirdPartyConnection.isOnHold()) {

        thirdPartyConnection.resume({
            success: function() { 
                console.log("third party conn resumed")
            },
            failure: function(err) { 
                console.log(err)
            }
        });

    }
}

export function onLeaveCall() {

    let agent = new connect.Agent();

    let contact = agent.getContacts(connect.ContactType.VOICE)[0];

    contact.getAgentConnection().destroy();
}

