const getters = {
    pageroute: state => state.common.pageroute,
    connect_instance : state => state.common.connect_instance,
    connect_alias: state => state.common.connect_alias,
    websocket_url : state => state.common.websocket_url,
    region : state => state.common.region,
    callLogs: state => state.common.callLogs,
    contactList : state => state.common.contactList,
    selectedLanguage : state => state.common.selectedLanguage,
    isTranscription : state => state.common.isTranscription,
    isTranslation : state => state.common.isTranslation,
    dialpadToggle : state => state.common.dialpadToggle,

    call_type : state => state.call.call_type,
    call_state : state => state.call.call_state,
    caller_name : state => state.call.caller_name,
    caller_number: state => state.call.caller_number,
    hold_status : state => state.call.hold_status,
    caller_id : state => state.call.caller_id,
    contact_attributes: state => state.call.contact_attributes,
    contact_id : state => state.call.contact_id,
    countryCode : state => state.call.countryCode,
    dialedNumber : state => state.call.dialedNumber,
    third_party_caller_name : state => state.call.third_party_caller_name,
    third_party_caller_number : state => state.call.third_party_caller_number,
    third_party_hold_status : state => state.call.third_party_hold_status,
    on_destroyed_flag: (state) => state.call.on_destroyed_flag,

    chat_state: state => state.chat.chat_state,
    chat_name: state => state.chat.chat_name,
    chat_email: state => state.chat.chat_email,

    tickets: state => state.ticket.tickets,
    editor : state => state.ticket.editor,
    selectedTicket : state => state.ticket.selectedTicket,
    ticketButtonStatus : state => state.ticket.ticketButtonStatus,
    noteButtonStatus : state => state.ticket.noteButtonStatus,

    mute_status : state => state.agent.mute_status,
    agent_name : state => state.agent.agent_name,
    agent_username : state => state.agent.agent_username,
    current_agent_state : state => state.agent.current_agent_state,
    agent_states : state => state.agent.agent_states,
    dialable_countries : state => state.agent.dialable_countries,
    quickconnects : state => state.agent.quickconnects,

    saveNumber : state => state.actions.saveNumber,
    homeSubNav : state => state.actions.homeSubNav,
    callSubNav : state => state.actions.callSubNav,
    outboundCall : state => state.actions.outboundCall,
    translationLang : state => state.actions.translationLang
  }
  export default getters
  