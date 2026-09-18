<template>
  <view class="container">
    <view class="header">
      <text class="title">单词学习</text>
    </view>
    
    <view v-if="!hasSelectedBook" class="no-book">
      <view class="icon">📚</view>
      <text class="tip">请先选择词书开始学习</text>
      <button class="select-btn" @click="goToSelectBook">选择词书</button>
    </view>
    
    <view v-else class="has-book">
      <view class="book-info">
        <view class="book-header">
          <text class="book-icon">{{ selectedBook.icon }}</text>
          <view class="book-detail">
            <text class="book-name">{{ selectedBook.name }}</text>
            <text class="book-desc">{{ selectedBook.description }}</text>
          </view>
          <button class="change-btn" size="mini" @click="goToSelectBook">更换</button>
        </view>
        
        <view class="stats">
          <view class="stat-item">
            <text class="stat-value">{{ todayQueueCount }}</text>
            <text class="stat-label">今日待学</text>
          </view>
          <view class="stat-item">
            <text class="stat-value">{{ completedWordsCount }}</text>
            <text class="stat-label">已掌握</text>
          </view>
          <view class="stat-item">
            <text class="stat-value">{{ dailyQuota }}</text>
            <text class="stat-label">每日目标</text>
          </view>
        </view>
      </view>
      
      <view class="actions">
        <button class="start-btn" @click="startLearning">开始学习</button>
        <button class="settings-btn" plain @click="showSettings">学习设置</button>
      </view>
      
      <view class="tips">
        <text class="tip-title">💡 学习说明</text>
        <text class="tip-text">• 复习词优先,每天至少30个新词</text>
        <text class="tip-text">• 熟练度≥6分当日脱离队列</text>
        <text class="tip-text">• 9-10分完全掌握不再复习</text>
      </view>
    </view>
    
    <view v-if="showSettingsModal" class="modal-mask" @click="closeSettings">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">学习设置</text>
        </view>
        <view class="modal-body">
          <view class="setting-item">
            <text class="setting-label">每日学习量</text>
            <input class="setting-input" type="number" v-model="tempQuota" />
          </view>
        </view>
        <view class="modal-footer">
          <button @click="closeSettings">取消</button>
          <button type="primary" @click="saveSettings">保存</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      showSettingsModal: false,
      tempQuota: 100
    }
  },
  computed: {
    ...mapState('word', ['selectedBook', 'dailyQuota']),
    ...mapGetters('word', ['hasSelectedBook', 'todayQueueCount', 'completedWordsCount'])
  },
  onShow() {
    if (this.hasSelectedBook) {
      this.loadTodayQueue()
    }
  },
  methods: {
    ...mapActions('word', ['generateTodayQueue', 'setDailyQuota']),
    goToSelectBook() {
      uni.navigateTo({
        url: '/pages/word/book-selector'
      })
    },
    startLearning() {
      if (this.todayQueueCount === 0) {
        uni.showToast({
          title: '今日学习已完成!',
          icon: 'success'
        })
        return
      }
      uni.navigateTo({
        url: '/pages/word/learning'
      })
    },
    loadTodayQueue() {
      const { getWordsByBookId } = require('../../data/word-books.js')
      const words = getWordsByBookId(this.selectedBook.id)
      this.generateTodayQueue(words)
    },
    showSettings() {
      this.tempQuota = this.dailyQuota
      this.showSettingsModal = true
    },
    closeSettings() {
      this.showSettingsModal = false
    },
    saveSettings() {
      this.setDailyQuota(parseInt(this.tempQuota))
      this.closeSettings()
      this.loadTodayQueue()
      uni.showToast({
        title: '设置已保存',
        icon: 'success'
      })
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}

.header {
  margin-bottom: 30px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.no-book {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.tip {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.select-btn {
  width: 200px;
  background: #3cc51f;
  color: white;
  border-radius: 25px;
}

.has-book {
  display: flex;
  flex-direction: column;
}

.book-info {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
}

.book-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.book-icon {
  font-size: 40px;
  margin-right: 15px;
}

.book-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.book-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.book-desc {
  font-size: 14px;
  color: #999;
}

.change-btn {
  font-size: 12px;
}

.stats {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #3cc51f;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.actions {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.start-btn {
  background: #3cc51f;
  color: white;
  border-radius: 25px;
  margin-bottom: 10px;
  font-size: 18px;
  height: 50px;
}

.settings-btn {
  border-radius: 25px;
  height: 45px;
}

.tips {
  background: white;
  border-radius: 15px;
  padding: 20px;
}

.tip-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  display: block;
}

.tip-text {
  font-size: 14px;
  color: #666;
  line-height: 24px;
  display: block;
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 80%;
  max-width: 400px;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.modal-body {
  padding: 20px;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.setting-label {
  font-size: 16px;
  color: #333;
}

.setting-input {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  width: 100px;
  text-align: center;
}

.modal-footer {
  display: flex;
  border-top: 1px solid #f0f0f0;
}

.modal-footer button {
  flex: 1;
  margin: 0;
  border-radius: 0;
}

.modal-footer button:first-child {
  border-bottom-left-radius: 15px;
}

.modal-footer button:last-child {
  border-bottom-right-radius: 15px;
}
</style>
