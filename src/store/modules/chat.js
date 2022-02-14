
const state = {
    chat_state : "",
    chat_name : "bk",
    chat_email : "bk@gmail.com"
  }
  
  const mutations = {
    UPDATE_CHAT_STATE: (state, chat_state) => {
      state.chat_state = chat_state
    },
    UPDATE_CHAT_NAME: (state, name) => {
      state.chat_name = name
    },
    UPDATE_CHAT_EMAIL: (state, email) => {
      state.chat_email = email
    }
  }
  
  const actions = {
    updateChatState({ commit }, chat_state) {
      commit('UPDATE_CHAT_STATE', chat_state)
    },
    updateChatDetails({ commit }, details) {
      commit('UPDATE_CHAT_NAME', details.customerName.value)
      commit('UPDATE_CHAT_EMAIL', details.customerEmail.value)
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  
  