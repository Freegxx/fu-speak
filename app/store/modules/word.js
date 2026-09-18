const STORAGE_KEY = 'fu_speak_word_data'

const state = {
  selectedBook: null,
  dailyQuota: 100,
  wordProgress: {},
  todayQueue: []
}

const mutations = {
  SET_SELECTED_BOOK(state, book) {
    state.selectedBook = book
    uni.setStorageSync('selected_book', book)
  },
  SET_DAILY_QUOTA(state, quota) {
    state.dailyQuota = quota
    uni.setStorageSync('daily_quota', quota)
  },
  UPDATE_WORD_PROGRESS(state, { wordId, progress }) {
    state.wordProgress[wordId] = progress
    uni.setStorageSync('word_progress', state.wordProgress)
  },
  SET_TODAY_QUEUE(state, queue) {
    state.todayQueue = queue
  },
  LOAD_LOCAL_DATA(state) {
    state.selectedBook = uni.getStorageSync('selected_book') || null
    state.dailyQuota = uni.getStorageSync('daily_quota') || 100
    state.wordProgress = uni.getStorageSync('word_progress') || {}
  }
}

const actions = {
  loadLocalData({ commit }) {
    commit('LOAD_LOCAL_DATA')
  },
  selectBook({ commit }, book) {
    commit('SET_SELECTED_BOOK', book)
  },
  setDailyQuota({ commit }, quota) {
    commit('SET_DAILY_QUOTA', quota)
  },
  updateWordProgress({ commit, state }, { wordId, masteryScore }) {
    const now = Date.now()
    const progress = state.wordProgress[wordId] || {
      wordId,
      firstSeenAt: now,
      reviewCount: 0,
      lastMasteryScore: 0,
      nextReviewAt: now
    }
    
    progress.reviewCount++
    progress.lastMasteryScore = masteryScore
    progress.lastReviewAt = now
    
    if (masteryScore >= 9) {
      progress.nextReviewAt = null
      progress.graduated = true
    } else if (masteryScore >= 8) {
      progress.nextReviewAt = now + 45 * 24 * 60 * 60 * 1000
    } else if (masteryScore >= 7) {
      progress.nextReviewAt = now + 14 * 24 * 60 * 60 * 1000
    } else if (masteryScore >= 6) {
      progress.nextReviewAt = now + 2 * 24 * 60 * 60 * 1000
    } else if (masteryScore >= 4) {
      progress.nextReviewAt = now + 1 * 24 * 60 * 60 * 1000
    } else {
      progress.nextReviewAt = now + 0.5 * 24 * 60 * 60 * 1000
    }
    
    commit('UPDATE_WORD_PROGRESS', { wordId, progress })
  },
  generateTodayQueue({ commit, state }, allWords) {
    const now = Date.now()
    const todayStart = new Date().setHours(0, 0, 0, 0)
    
    const newWords = []
    const reviewWords = []
    
    allWords.forEach(word => {
      const progress = state.wordProgress[word.id]
      if (!progress) {
        newWords.push(word)
      } else if (!progress.graduated && progress.nextReviewAt && progress.nextReviewAt <= now) {
        reviewWords.push(word)
      }
    })
    
    const queue = []
    const quota = state.dailyQuota
    
    queue.push(...reviewWords)
    
    if (newWords.length > 0) {
      const minNewWords = Math.min(30, newWords.length)
      const remainingSlots = quota - reviewWords.length
      const newWordsToAdd = Math.max(minNewWords, Math.min(remainingSlots, newWords.length))
      queue.push(...newWords.slice(0, newWordsToAdd))
    }
    
    commit('SET_TODAY_QUEUE', queue.slice(0, quota))
  }
}

const getters = {
  hasSelectedBook: state => !!state.selectedBook,
  todayQueueCount: state => state.todayQueue.length,
  completedWordsCount: state => {
    return Object.values(state.wordProgress).filter(p => p.graduated).length
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
