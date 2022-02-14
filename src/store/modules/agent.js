
const state = {
    current_agent_state : "",
    mute_status : false,
    
    agent_name: "",
    agent_username: "",
    softphone_enabled : false,
    softphone_auto_accept: false,
    agent_states: [],
    permissions: [],
    dialable_countries: [],
    quickconnects: [
      { 
        "name" : "bob"
      },
      { 
        "name" : "bob2"
      },
      { 
        "name" : "bob3"
      },
      { 
        "name" : "bob4"
      },
      { 
        "name" : "bob"
      },
      { 
        "name" : "bob2"
      },
      { 
        "name" : "bob3"
      },
      { 
        "name" : "bob4"
      },
      { 
        "name" : "bob"
      },
      { 
        "name" : "bob2"
      },
      { 
        "name" : "bob3"
      },
      { 
        "name" : "bob4"
      }
    ],
  }
  
  const mutations = {
    UPDATE_AGENT_STATE: (state, agent_state) => {
      state.current_agent_state = agent_state
    },
    UPDATE_MUTE_STATUS: (state, status) => {
      state.mute_status = status
    },
    SET_QUICK_CONNECTS: (state, contacts) => {
      state.quickconnects = contacts
    },
    SET_AGENT_CONFIG: (state, config) => {
      state.agent_name =  config.name,
      state.agent_username =  config.username,
      state.softphone_enabled  =  config.softphoneEnabled,
      state.softphone_auto_accept =  config.softphoneAutoAccept,
      state.agent_states =  config.agentStates,
      state.permissions =  config.permissions,
      state.dialable_countries =  config.dialableCountries
    }
  }
  
  const actions = {
    updateAgentState({ commit }, agent_state) {
      commit('UPDATE_AGENT_STATE', agent_state)
    },
    updateMuteStatus({ commit }, status) {
      commit('UPDATE_MUTE_STATUS', status)
    },
    setAgentConfig({ commit }, config) {
      commit('SET_AGENT_CONFIG', config)
    },
    setQuickConnects({ commit }, contacts) {
      commit('SET_QUICK_CONNECTS', contacts)
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  
  