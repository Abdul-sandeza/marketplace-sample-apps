import store from '../store'

export function agentStateChange() {

    let agent = new connect.Agent();

    agent.onStateChange((agentStateChange) => {
        store.dispatch("agent/updateAgentState" , agentStateChange.newState);
    });
  
}

export function agentMuteStatus() {

    let agent = new connect.Agent();

    agent.onMuteToggle(function(obj) {
        store.dispatch("agent/updateMuteStatus" , obj.muted);
     });
  
}

export function agentCallStatus() {

    let agent = new connect.Agent();

    let contact = agent.getContacts();

    console.log(contact)

    if(contact.length > 0) {
        console.log("THIS IS AGENT STAATUS=========",contact[0].getStatus());
        console.log(contact[0].getState());
        // contact.getState()
    }
  
}