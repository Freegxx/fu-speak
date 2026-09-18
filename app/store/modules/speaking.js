const state = {
  conversations: [],
  currentScene: null,
  personalVocabulary: []
}

const mutations = {
  ADD_CONVERSATION(state, conversation) {
    state.conversations.unshift(conversation)
    uni.setStorageSync('speaking_conversations', state.conversations)
  },
  SET_CURRENT_SCENE(state, scene) {
    state.currentScene = scene
  },
  ADD_PERSONAL_WORD(state, word) {
    if (!state.personalVocabulary.find(w => w.word === word.word)) {
      state.personalVocabulary.push({
        ...word,
        addedAt: Date.now()
      })
      uni.setStorageSync('personal_vocabulary', state.personalVocabulary)
    }
  },
  LOAD_LOCAL_DATA(state) {
    state.conversations = uni.getStorageSync('speaking_conversations') || []
    state.personalVocabulary = uni.getStorageSync('personal_vocabulary') || []
  }
}

const actions = {
  loadLocalData({ commit }) {
    commit('LOAD_LOCAL_DATA')
  },
  saveConversation({ commit }, conversation) {
    commit('ADD_CONVERSATION', conversation)
  },
  setCurrentScene({ commit }, scene) {
    commit('SET_CURRENT_SCENE', scene)
  },
  addPersonalWord({ commit }, word) {
    commit('ADD_PERSONAL_WORD', word)
  }
}

const getters = {
  conversationCount: state => state.conversations.length,
  personalVocabularyCount: state => state.personalVocabulary.length
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
