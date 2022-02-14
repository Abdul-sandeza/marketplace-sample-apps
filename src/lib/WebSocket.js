// import io from 'socket.io-client';
// const socket = io();

import store from "./../store"

export function websocketConnection(contactId) {

    console.log("------------> websocket fun called - " + contactId)

    console.log(store.getters.websocket_url)

    let socket = new WebSocket(store.getters.websocket_url);

    socket.onopen = function(event) {
        console.log("---------> websocket connected" + JSON.stringify(event))
        console.log({ "action": "onMessage", "actions": "agentReceivedCall", "message": contactId })
        console.log(store.getters.isTranscription)
        if(store.getters.isTranscription == true) {
            socket.send(JSON.stringify({ "action": "onMessage", "actions": "agentReceivedCall", "message": contactId }))
        }
    };

    socket.onmessage = function(event) {
     

        let message = JSON.parse(event.data)
        console.log("--------")
        console.log(message)

        if(message.type == "transcribe") {

            let passData = {};
            passData.action = "TRANSCRIBE";
            passData.text = message;
           // console.log(passData)
            parent.postMessage(passData,"*");

            if(message.user == "Customer") {

                if(store.getters.isTranslation == true) {
                    socket.send(JSON.stringify({ "action": "onMessage", "actions": "translate", "message": message.message , "target" : store.getters.translationLang }))
                }

            }

        } else if(message.type == "translate") {

            let passData = {};
            passData.action = "TRANSLATE";
            passData.text = message.message;
            //console.log(passData)
            parent.postMessage(passData,"*");

        }
    };

    socket.onerror = function(event) {
        console.log("WebSocket error observed:", event);
    };

    socket.onclose = function(event) {
    }
}