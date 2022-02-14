
const state = {
    saveNumber : "+0",
    homeSubNav : "home",
    callSubNav : "call",
    outboundCall : false,

    translationLang : "fr"
  }
  
  const mutations = {
    SET_SAVE_NUMBER: (state, number) => {
      state.saveNumber = number
    },
    HOME_SUB_NAV: (state, nav) => {
      state.homeSubNav = nav
    },
    CALL_SUB_NAV: (state, nav) => {
      state.callSubNav = nav
    },
    SET_OUTBOUND_CALL: (state, nav) => {
      state.outboundCall = nav
    },
    SET_TRANSLATION_LANG: (state, lang) => {
      state.translationLang = lang
    },
  }
  
  const actions = {
    setSaveNumber({ commit }, number) {
      commit('SET_SAVE_NUMBER', number)
    },

    setTranslationLang({ commit }, lang) {
      console.log("trans language Changed --> " + lang)
      commit('SET_TRANSLATION_LANG', lang)
    },
  
    homeSubNavigation({ commit }, nav) {
      commit('HOME_SUB_NAV', nav)
    },

    callSubNavigation({ commit }, nav) {
      commit('CALL_SUB_NAV', nav)
    },
  
    setOutboundCall({ commit }, status) {
      console.log(status)
      commit('SET_OUTBOUND_CALL', status)
    }
  
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  
  