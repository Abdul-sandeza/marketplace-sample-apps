import store from '../store'

const CallActions = () => {

    return {

        loadUsers : async() => {
            console.log('Users component is loaded...')
            store.dispatch("common/routePage", "call");
        }

    }

    // async loadUsers() {
    //   console.log('Users component is loaded...')
    //   store.dispatch("common/routePage", "call");
    // }
    
    // async onAddConference(type,number) {
    
    //     let agent = new connect.Agent();
    
    //     let contact = agent.getContacts()[0];
    
    //     let thirdParty;
    
    //     if(type == 'number') {
    //         thirdParty = connect.Endpoint.byPhoneNumber(number);
    //     } else {
    //         thirdParty = contact
    //     }
    
    //     contact.addConnection(thirdParty)
      
    // }
}

module.exports = CallActions;