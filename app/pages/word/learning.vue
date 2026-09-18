<template>
  <view class="container">
    <view class="progress-bar">
      <view class="progress-fill" :style="{ width: progressPercent + '%' }"></view>
      <text class="progress-text">{{ currentIndex + 1 }} / {{ totalCount }}</text>
    </view>
    
    <view v-if="currentWord" class="word-card">
      <view class="card-content" @click="toggleReveal">
        <view v-if="!revealed" class="question">
          <text class="prompt-text">{{ promptText }}</text>
          <input 
            v-if="showInput" 
            class="answer-input" 
            v-model="userAnswer" 
            :placeholder="inputPlaceholder"
            @confirm="checkAnswer"
          />
          <view v-else class="tap-hint">
            <text>点击任意处查看详情</text>
          </view>
        </view>
        
        <view v-else class="answer">
          <view class="word-header">
            <text class="word-text">{{ currentWord.word }}</text>
            <view class="audio-controls">
              <button class="audio-btn" size="mini" @click.stop="playAudio('uk')">🔊 英</button>
              <button class="audio-btn" size="mini" @click.stop="playAudio('us')">🔊 美</button>
            </view>
          </view>
          
          <text class="phonetic">英 {{ currentWord.phonetic.uk }} | 美 {{ currentWord.phonetic.us }}</text>
          
          <view class="definitions">
            <text class="definition-label">释义:</text>
            <text class="definition-text">{{ currentWord.definitions.cn }}</text>
          </view>
          
          <view class="examples">
            <text class="example-label">例句:</text>
            <view v-for="(example, index) in currentWord.examples" :key="index" class="example-item">
              <text class="example-en">{{ example.en }}</text>
              <text class="example-cn">{{ example.cn }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view v-if="revealed" class="mastery-control">
      <text class="mastery-label">熟练度评分</text>
      <view class="mastery-bar">
        <view 
          v-for="score in 10" 
          :key="score" 
          class="mastery-item"
          :class="'mastery-' + score"
          @click="markMastery(score)"
        >
          <text class="score-text">{{ score }}</text>
          <text v-if="score === 6" class="hint-text">当日脱离</text>
          <text v-if="score === 7" class="hint-text">10-20天</text>
          <text v-if="score === 9" class="hint-text">完全掌握</text>
        </view>
      </view>
      <view class="mastery-tips">
        <text class="tip-item">🟡 1-5: 继续练习</text>
        <text class="tip-item">🟢 6: 一两天后复习</text>
        <text class="tip-item">🟢 7-8: 间隔更长</text>
        <text class="tip-item">🟢 9-10: 毕业</text>
      </view>
    </view>
    
    <view v-if="showComplete" class="complete-overlay">
      <view class="complete-card">
        <text class="complete-icon">🎉</text>
        <text class="complete-title">今日学习完成!</text>
        <text class="complete-desc">你已完成今天的学习任务</text>
        <button class="back-btn" @click="goBack">返回</button>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getWordsByBookId } from '../../data/word-books.js'

export default {
  data() {
    return {
      currentIndex: 0,
      currentWord: null,
      queue: [],
      revealed: false,
      showInput: false,
      userAnswer: '',
      showChinese: true,
      showComplete: false,
      studyStartTime: 0
    }
  },
  computed: {
    ...mapState('word', ['selectedBook', 'todayQueue']),
    totalCount() {
      return this.queue.length
    },
    progressPercent() {
      return this.totalCount > 0 ? (this.currentIndex / this.totalCount) * 100 : 0
    },
    promptText() {
      return this.showChinese ? this.currentWord.definitions.cn : this.currentWord.word
    },
    inputPlaceholder() {
      return this.showChinese ? '输入英文单词 (可选)' : '输入中文释义 (可选)'
    }
  },
  onLoad() {
    this.studyStartTime = Date.now()
    this.loadQueue()
  },
  onUnload() {
    this.recordStudyTime()
  },
  methods: {
    ...mapActions('word', ['updateWordProgress', 'generateTodayQueue']),
    ...mapActions('user', ['addStudyTime']),
    loadQueue() {
      if (this.todayQueue && this.todayQueue.length > 0) {
        this.queue = [...this.todayQueue]
        this.loadCurrentWord()
      } else {
        const words = getWordsByBookId(this.selectedBook.id)
        this.generateTodayQueue(words)
        this.queue = [...this.todayQueue]
        this.loadCurrentWord()
      }
    },
    loadCurrentWord() {
      if (this.currentIndex < this.queue.length) {
        this.currentWord = this.queue[this.currentIndex]
        this.revealed = false
        this.userAnswer = ''
        this.showChinese = Math.random() > 0.5
      } else {
        this.showComplete = true
      }
    },
    toggleReveal() {
      if (!this.revealed) {
        this.revealed = true
      }
    },
    playAudio(type) {
      uni.showToast({
        title: `播放${type === 'uk' ? '英式' : '美式'}发音 (TTS待接入)`,
        icon: 'none'
      })
    },
    checkAnswer() {
      this.revealed = true
    },
    markMastery(score) {
      this.updateWordProgress({
        wordId: this.currentWord.id,
        masteryScore: score
      })
      
      this.currentIndex++
      
      if (this.currentIndex < this.queue.length) {
        this.loadCurrentWord()
      } else {
        this.recordStudyTime()
        this.showComplete = true
      }
    },
    recordStudyTime() {
      const minutes = Math.floor((Date.now() - this.studyStartTime) / 60000)
      if (minutes > 0) {
        this.addStudyTime(minutes)
      }
    },
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.progress-bar {
  height: 8px;
  background: #e0e0e0;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: #3cc51f;
  transition: width 0.3s;
}

.progress-text {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 14px;
  color: #666;
}

.word-card {
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content {
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.question {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.prompt-text {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.answer-input {
  width: 100%;
  border: 2px solid #3cc51f;
  border-radius: 10px;
  padding: 15px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}

.tap-hint {
  margin-top: 40px;
}

.tap-hint text {
  font-size: 14px;
  color: #999;
}

.answer {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.word-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.word-text {
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

.audio-controls {
  display: flex;
  gap: 5px;
}

.audio-btn {
  font-size: 12px;
  padding: 5px 10px;
}

.phonetic {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.definitions {
  margin-bottom: 20px;
}

.definition-label {
  font-size: 14px;
  color: #999;
  margin-bottom: 5px;
  display: block;
}

.definition-text {
  font-size: 18px;
  color: #333;
  line-height: 28px;
}

.examples {
  margin-top: 20px;
}

.example-label {
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
  display: block;
}

.example-item {
  margin-bottom: 15px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 10px;
}

.example-en {
  font-size: 15px;
  color: #333;
  line-height: 22px;
  display: block;
  margin-bottom: 5px;
}

.example-cn {
  font-size: 13px;
  color: #666;
  line-height: 20px;
  display: block;
}

.mastery-control {
  background: white;
  padding: 20px;
  border-top: 1px solid #f0f0f0;
}

.mastery-label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 15px;
  text-align: center;
}

.mastery-bar {
  display: flex;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.mastery-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.mastery-1 { background: #ffd54f; }
.mastery-2 { background: #ffca28; }
.mastery-3 { background: #ffc107; }
.mastery-4 { background: #ffb300; }
.mastery-5 { background: #ffa000; }
.mastery-6 { background: #c5e1a5; }
.mastery-7 { background: #9ccc65; }
.mastery-8 { background: #7cb342; }
.mastery-9 { background: #558b2f; }
.mastery-10 { background: #33691e; }

.score-text {
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.hint-text {
  position: absolute;
  bottom: -20px;
  font-size: 10px;
  color: #666;
  white-space: nowrap;
}

.mastery-tips {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
}

.tip-item {
  font-size: 11px;
  color: #666;
}

.complete-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.complete-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.complete-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.complete-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.complete-desc {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.back-btn {
  background: #3cc51f;
  color: white;
  border-radius: 25px;
  width: 200px;
}
</style>
