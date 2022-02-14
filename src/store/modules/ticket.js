
const state = {
    tickets : [],
    editor : false,
    selectedTicket : "",
    ticketButtonStatus : false,
    noteButtonStatus : false
  }
  
  const mutations = {
    SET_TICKETS: (state, tickets) => {
        state.tickets = tickets
    },
    PUSH_TICKET: (state, ticket) => {
        state.tickets.unshift(ticket)
    },
    TOGGLE_EDITOR: (state, status) => {
        state.editor = status
    },
    TOGGLE_TICKET_BUTTON: (state, status) => {
        state.ticketButtonStatus = status
    },
    TOGGLE_NOTE_BUTTON: (state, status) => {
        state.noteButtonStatus = status
    },
    SET_SELECTED_TICKET: (state, ticket) => {
        state.selectedTicket = ticket
    },
  }
  
  const actions = {
    setTickets({ commit }, attributes) {
        let tickets = [];
        try {
            if(attributes.customerInfo) {
                let info = JSON.parse(attributes.customerInfo.value)
                tickets = info.tickets.openTickets
            }
        } catch(e) {
            console.log(e)
        }
        commit('SET_TICKETS', tickets)
    },
    toggleEditor({ commit }, status) {
        commit('TOGGLE_EDITOR', status)
    },
    toggleTicketButton({ commit }, status) {
        commit('TOGGLE_TICKET_BUTTON', status)
    },
    toggleNoteButton({ commit }, status) {
        commit('TOGGLE_NOTE_BUTTON', status)
    },
    setSelectedTicket({ commit }, ticket) {
        console.log("------------> " + ticket);
        commit('SET_SELECTED_TICKET', ticket)
    },
    pushTicket({ commit }, ticketDetails) {
        let ticket = {}
        ticket.id = ticketDetails.ticketId;
        ticket.subject = ticketDetails.ticketSubject;
        console.log(ticket)
        commit('PUSH_TICKET', ticket)
    },
  
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  
  