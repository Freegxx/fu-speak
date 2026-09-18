<template>
  <view class="container">
    <view v-if="conversations.length === 0" class="empty">
      <text class="empty-icon">💬</text>
      <text class="empty-text">还没有对话记录</text>
    </view>
    
    <view v-else class="conversation-list">
      <view 
        v-for="(conv, index) in conversations" 
        :key="index" 
        class="conversation-item"
        @click="viewDetail(conv)"
      >
        <view class="conv-header">
          <text class="conv-scene">{{ conv.sceneName }}</text>
          <text class="conv-time">{{ formatTime(conv.timestamp) }}</text>
        </view>
        <view class="conv-stats">
          <text class="conv-stat">📝 {{ conv.messages.length }} 条消息</text>
          <text class="conv-stat">⏱ {{ conv.duration }} 分钟</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('speaking', ['conversations'])
  },
  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp)
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return `${month}月${day}日 ${hours}:${minutes.toString().padStart(2, '0')}`
    },
    viewDetail(conv) {
      uni.showToast({
        title: '对话详情页待实现',
        icon: 'none'
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

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 16px;
  color: #999;
}

.conversation-list {
  display: flex;
  flex-direction: column;
}

.conversation-item {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
}

.conv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.conv-scene {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.conv-time {
  font-size: 12px;
  color: #999;
}

.conv-stats {
  display: flex;
  gap: 15px;
}

.conv-stat {
  font-size: 14px;
  color: #666;
}
</style>
