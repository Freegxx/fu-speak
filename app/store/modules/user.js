const state = {
  isLoggedIn: false,
  userInfo: null,
  studyTime: 0,
  level: 0,
  studyHistory: {}
}

const mutations = {
  SET_LOGIN_STATUS(state, status) {
    state.isLoggedIn = status
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
    uni.setStorageSync('user_info', userInfo)
  },
  ADD_STUDY_TIME(state, minutes) {
    const today = new Date().toISOString().split('T')[0]
    if (!state.studyHistory[today]) {
      state.studyHistory[today] = 0
    }
    
    const dailyLimit = 4 * 60
    if (state.studyHistory[today] < dailyLimit) {
      const effectiveMinutes = Math.min(minutes, dailyLimit - state.studyHistory[today])
      state.studyHistory[today] += effectiveMinutes
      state.studyTime += effectiveMinutes
      state.level = Math.floor(state.studyTime / 60)
      
      uni.setStorageSync('study_time', state.studyTime)
      uni.setStorageSync('study_history', state.studyHistory)
      uni.setStorageSync('level', state.level)
    }
  },
  LOAD_LOCAL_DATA(state) {
    state.userInfo = uni.getStorageSync('user_info') || null
    state.isLoggedIn = !!state.userInfo
    state.studyTime = uni.getStorageSync('study_time') || 0
    state.level = uni.getStorageSync('level') || 0
    state.studyHistory = uni.getStorageSync('study_history') || {}
  }
}

const actions = {
  loadLocalData({ commit }) {
    commit('LOAD_LOCAL_DATA')
  },
  login({ commit }, userInfo) {
    commit('SET_LOGIN_STATUS', true)
    commit('SET_USER_INFO', userInfo)
  },
  logout({ commit }) {
    commit('SET_LOGIN_STATUS', false)
    commit('SET_USER_INFO', null)
  },
  addStudyTime({ commit }, minutes) {
    commit('ADD_STUDY_TIME', minutes)
  }
}

const getters = {
  displayLevel: state => `Lv.${state.level}`,
  todayStudyTime: state => {
    const today = new Date().toISOString().split('T')[0]
    return state.studyHistory[today] || 0
  },
  getDayColor: state => date => {
    const minutes = state.studyHistory[date] || 0
    if (minutes < 10) return 'yellow'
    if (minutes < 30) return 'light-green'
    return 'deep-green'
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
