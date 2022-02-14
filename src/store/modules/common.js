
const state = {
  pageroute : "login",
  connect_instance : "",
  region: "",
  websocket_url: "",
  dialpadToggle: false,
  connect_alias:"",

  callLogs: [{"action":"CALL_LOGS","callType":"incoming","agentId":"freshdesk-agent","callerName":"Karthik Anand","callerNumber":"+18336624150","callerId":47013039105,"calledTime":"2021-02-02 19:21:15"},{"action":"CALL_LOGS","callType":"incoming","agentId":"freshdesk-agent","callerName":"Karthik Anand","callerNumber":"+18336624150","callerId":47013039105,"calledTime":"2021-02-02 19:39:27"},{"action":"CALL_LOGS","callType":"incoming","agentId":"freshdesk-agent","callerName":"Karthik Anand","callerNumber":"+18336624150","callerId":47013039105,"calledTime":"2021-02-02 19:41:36"},{"action":"CALL_LOGS","callType":"incoming","agentId":"freshdesk-agent","callerName":"Karthik Anand","callerNumber":"+18336624150","callerId":47013039105,"calledTime":"2021-02-02 19:43:21"},{"action":"CALL_LOGS","callType":"incoming","agentId":"freshdesk-agent","callerName":"Karthik Anand","callerNumber":"+18336624150","callerId":47013039105,"calledTime":"2021-02-03 01:32:04"},{"action":"CALL_LOGS","callType":"incoming","agentId":"freshdesk-agent","callerName":"Unknown Caller","callerNumber":"+18556157178","callerId":0,"calledTime":"2021-07-06 15:04:14"},{"action":"CALL_LOGS","callType":"incoming","agentId":"freshdesk-agent","callerName":"Unknown Caller","callerNumber":"+18556157178","callerId":0,"calledTime":"2021-07-06 15:04:52"}],
  contactList : [],
  selectedLanguage : "en",
  isTranscription : false,
  isTranslation : false
}

const mutations = {
  ROUTE_PAGE: (state, pageroute) => {
    state.pageroute = pageroute
  },
  SET_INSTANCE_DETAILS: (state, details) => {
    state.connect_instance = details.connect_instance
    state.region = details.region
    state.websocket_url = details.websocket_url
    state.connect_alias = details.connect_alias
  },
  SET_CALL_LOGS: (state, logs) => {
    state.callLogs = logs
  },
  PUSH_CALL_LOGS: (state, logs) => {
    state.callLogs.unshift(logs)
  },
  SET_CONTACT_LIST: (state, contacts) => {
    state.contactList = contacts
  },
  SET_SELECTED_LANGUAGE: (state, lang) => {
    state.selectedLanguage = lang
  },
  SET_TRANSCRIPTION_STATUS: (state, status) => {
    state.isTranscription = status
  },
  SET_TRANSLATION_STATUS: (state, status) => {
    state.isTranslation = status
  },
  DIALPAD_TOGGLE: (state) => {
    state.dialpadToggle = !state.dialpadToggle
  },
}

const actions = {
  routePage({ commit }, pageroute) {
    commit('ROUTE_PAGE', pageroute)
  },

  setInstanceDetails({ commit }, details) {
    commit('SET_INSTANCE_DETAILS', details)
  },
  setCallContactDetails({ commit }, details) {
    commit('SET_CALL_LOGS', details.callData.reverse())
    commit('SET_CONTACT_LIST', details.contactList)
    commit('SET_SELECTED_LANGUAGE', details.language)
    commit('SET_TRANSCRIPTION_STATUS', details.isTranscription)
    commit('SET_TRANSLATION_STATUS', details.isTranslation)
  },
  pushCallLogs({ commit }, log) {
    commit('PUSH_CALL_LOGS', log)
  },
  setDialpadToogle({ commit }) {
    commit('DIALPAD_TOGGLE')
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

