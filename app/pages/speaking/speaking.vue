<template>
  <view class="container">
    <view class="header">
      <text class="title">口语练习</text>
      <button class="history-btn" size="mini" @click="goToHistory">对话记录</button>
    </view>
    
    <view class="intro">
      <text class="intro-title">🎤 实时语音对话练习</text>
      <text class="intro-text">选择日常场景,与AI进行实时语音对话</text>
      <text class="intro-text">每句话AI会立即纠正,帮助你提高口语</text>
    </view>
    
    <view class="scenes">
      <text class="section-title">选择场景</text>
      <view class="scene-list">
        <view 
          v-for="scene in scenes" 
          :key="scene.id" 
          class="scene-item"
          @click="selectScene(scene)"
        >
          <text class="scene-icon">{{ scene.icon }}</text>
          <view class="scene-info">
            <text class="scene-name">{{ scene.name }}</text>
            <text class="scene-desc">{{ scene.description }}</text>
          </view>
          <view class="scene-badge" :class="'difficulty-' + scene.difficulty">
            {{ difficultyText(scene.difficulty) }}
          </view>
        </view>
      </view>
    </view>
    
    <view class="stats">
      <view class="stat-card">
        <text class="stat-value">{{ conversationCount }}</text>
        <text class="stat-label">对话次数</text>
      </view>
      <view class="stat-card">
        <text class="stat-value">{{ personalVocabularyCount }}</text>
        <text class="stat-label">生词收藏</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { SPEAKING_SCENES } from '../../data/speaking-scenes.js'

export default {
  data() {
    return {
      scenes: SPEAKING_SCENES
    }
  },
  computed: {
    ...mapGetters('speaking', ['conversationCount', 'personalVocabularyCount'])
  },
  methods: {
    ...mapActions('speaking', ['setCurrentScene']),
    selectScene(scene) {
      this.setCurrentScene(scene)
      uni.navigateTo({
        url: '/pages/speaking/conversation'
      })
    },
    goToHistory() {
      uni.navigateTo({
        url: '/pages/speaking/history'
      })
    },
    difficultyText(difficulty) {
      const map = {
        easy: '简单',
        medium: '中等',
        hard: '困难'
      }
      return map[difficulty] || '简单'
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.history-btn {
  font-size: 12px;
}

.intro {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
}

.intro-title {
  font-size: 20px;
  font-weight: bold;
  color: white;
  display: block;
  margin-bottom: 10px;
}

.intro-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 22px;
  display: block;
}

.scenes {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  display: block;
}

.scene-list {
  display: flex;
  flex-direction: column;
}

.scene-item {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.scene-icon {
  font-size: 40px;
  margin-right: 15px;
}

.scene-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.scene-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.scene-desc {
  font-size: 14px;
  color: #666;
}

.scene-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
}

.difficulty-easy {
  background: #4caf50;
}

.difficulty-medium {
  background: #ff9800;
}

.difficulty-hard {
  background: #f44336;
}

.stats {
  display: flex;
  gap: 15px;
}

.stat-card {
  flex: 1;
  background: white;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}
</style>
