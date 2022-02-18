
const state = {
    call_type : "normal",
    call_state : "",
    caller_number : "+10",
    caller_name: "Unknown Caller",
    hold_status : false,
    third_party_caller_name: "Unknown Caller2",
    third_party_caller_number : "+11",
    third_party_hold_status : false,
    caller_id: 0,
    contact_attributes: {},
    contact_id: 0,
    on_destroyed_flag:false,
    on_outbound_flag:false,
    dialedNumber: "",
    start_time:"",
    end_time:"",
    displayHours:"00",
    displayMinutes:"00",
    displaySeconds:"00",
    onSetTimerFlag:false,
    callDuration:"",
    countryCode : { country : "us" , code : "+1" },
    fs_call_type: false
  }
  
  const mutations = {
    UPDATE_CALL_STATE: (state, call_state) => {
      state.call_state = call_state
    },
    UPDATE_CALLER_NAME: (state, name) => {
      console.log("CALLER NAME UPDATED",name)
      state.caller_name = name
    },
    UPDATE_CALLER_NUMBER: (state, number) => {
      state.caller_number = number
    },
    SET_CONTACT_ATTRIBUTES: (state, attributes) => {
      state.contact_attributes = attributes
    },
    SET_CALLER_ID: (state, id) => {
      state.caller_id = id
    },
    SET_CALL_TYPE: (state, type) => {
      state.call_type = type
    },
    SET_CONTACT_ID: (state, id) => {
      state.contact_id = id
    },
    SET_COUNTRY_CODE: (state, code) => {
      state.countryCode = code
    },
    SET_DIALED_NUMBER: (state, number) => {
      state.dialedNumber = number
    },
    UPDATE_HOLD_STATUS: (state, status) => {
      state.hold_status = status
    },
    UPDATE_THIRD_PARTY_HOLD_STATUS: (state, status) => {
      state.third_party_hold_status = status
    },
    SET_ONDESTROYED_FLAG: (state, flag) => {
      state.on_destroyed_flag = flag
    },
    SET_START_TIME:(state,status)=>{
      state.start_time = status
    },
    SET_END_TIME:(state,status)=>{
      state.end_time = status
    },
    SET_DISPLAY_HOURS:(state,status)=>{
      state.displayHours = status

    },
    SET_DISPLAY_MINUTES:(state,status)=>{
      state.displayMinutes = status

    },
    SET_DISPLAY_SECONDS:(state,status)=>{
      state.displaySeconds = status

    },
    SET_ON_SET_TIMER_FLAG:(state,status)=>{
      state.onSetTimerFlag = status
    },
    SET_CALL_DURATION:(state,status)=>{
      state.callDuration = status
    },
    SET_ON_OUTBOUND_FLAG:(state,status)=>{
      state.on_outbound_flag = status
    },
    SET_FS_CALL_TYPE:(state,status)=>{
      state.fs_call_type = status
    }
  }
  
  const actions = {
    updateCallState({ commit }, call_state) {
      commit('UPDATE_CALL_STATE', call_state)
    },
    updateCallerName({ commit }, name) {
      console.log('actions',name)
      commit('UPDATE_CALLER_NAME', name)
    },
    updateCallerNumber({ commit }, number) {
      commit('UPDATE_CALLER_NUMBER', number)
    },
    setContactId({ commit }, id) {
      commit('SET_CONTACT_ID', id)
    },
    setCountryCode({ commit }, code) {
      commit('SET_COUNTRY_CODE', code)
    },
    setDialedNumber({ commit }, number) {
      commit('SET_DIALED_NUMBER', number)
    },
    setCallType({ commit }, type) {
      commit('SET_CALL_TYPE', type)
    },
    setContactAttributes({ commit }, attributes) {
      console.log(JSON.stringify(attributes))

      let name = "Unknown Caller";
      let caller_id = 0;
      let email = ""
      let first_name = ""
      let last_name = ""
      let mobile_number = ""
      let work_number = ""
        try {
            if(attributes.customerInfo) {
                let info = JSON.parse(attributes.customerInfo.value)
                console.log("THIS IS CUSTOMERINFO",info)
                name = info.name
                caller_id = info.caller_id
                email = info.email
                first_name = info.first_name
                last_name=  info.last_name
                mobile_number= info.mobile_number
                work_number= info.work_number
            }
        } catch(e) {
            console.log(e)
        }

      commit('SET_CONTACT_ATTRIBUTES', attributes)
      commit('UPDATE_CALLER_NAME', name)
      commit('SET_CALLER_ID', caller_id)
    },
    updateHoldStatus({ commit }, status) {
      console.log(status)
      commit('UPDATE_HOLD_STATUS', status)
    },
    updateThirdPartyHoldStatus({ commit }, status) {
      commit('UPDATE_THIRD_PARTY_HOLD_STATUS', status)
    },
    updateOnDestroyedFlag({ commit }, flag) {
      console.log(flag)
      commit('SET_ONDESTROYED_FLAG', flag)
    },
    updateOnOutboundFlag({commit},flag){
      console.log("THIS IS OUTBOUND FLAG",flag)
      commit('SET_ON_OUTBOUND_FLAG',flag)
    },
    updateStartTime({commit},status){
      console.log(status)
      commit('SET_START_TIME',status)
    },
    updateEndTime({commit},status){
      console.log(status)
      commit('SET_END_TIME',status)
    },
    updateHours({commit},status){
      console.log(status)
      commit('SET_DISPLAY_HOURS',status)
    },
    updateMinutes({commit},status){
      console.log(status)
      commit('SET_DISPLAY_MINUTES',status)
    },
    updateSeconds({commit},status){
      console.log(status)
      commit('SET_DISPLAY_SECONDS',status)
    },
    updateOnSetTimerFlag({commit},status){
      console.log(status)
      commit('SET_ON_SET_TIMER_FLAG',status)
    },
    updateCallDuration({commit},status){
      commit('SET_CALL_DURATION',status)
    },
    updateFsCallType({commit},status){
      commit('SET_FS_CALL_TYPE',status)
    },
    updateCallerId({commit},status){
      commit('SET_CALLER_ID',status)
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  
  