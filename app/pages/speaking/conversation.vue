<template>
  <view class="container">
    <view class="header">
      <view class="scene-info">
        <text class="scene-icon">{{ currentScene.icon }}</text>
        <text class="scene-name">{{ currentScene.name }}</text>
      </view>
    </view>
    
    <scroll-view class="chat-area" scroll-y :scroll-into-view="'msg-' + messages.length">
      <view class="messages">
        <view 
          v-for="(msg, index) in messages" 
          :key="index" 
          :id="'msg-' + index"
          class="message"
          :class="msg.role"
        >
          <view class="message-bubble">
            <text class="message-text">{{ msg.content }}</text>
            <view v-if="msg.correction" class="correction">
              <text class="correction-label">✅ 纠正:</text>
              <text class="correction-text">{{ msg.correction }}</text>
            </view>
            <view v-if="msg.unknownWords && msg.unknownWords.length > 0" class="unknown-words">
              <text 
                v-for="word in msg.unknownWords" 
                :key="word"
                class="word-tag"
                @click="markAsUnknown(word)"
              >
                {{ word }} +
              </text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <view class="input-area">
      <button 
        class="record-btn" 
        :class="{ recording: isRecording }"
        @touchstart="startRecording"
        @touchend="stopRecording"
      >
        <text class="record-icon">{{ isRecording ? '⏹' : '🎤' }}</text>
        <text class="record-text">{{ isRecording ? '松开结束' : '按住说话' }}</text>
      </button>
      
      <view class="tips">
        <text class="tip-text">💡 本页面使用模拟对话,实际版本将接入真实STT/TTS/AI</text>
        <text class="tip-text">点击生词标签可加入「我的口语生词」词书</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      isRecording: false,
      messages: [],
      conversationStartTime: 0,
      mockResponses: [
        { 
          ai: "Hello! Welcome to our restaurant. How can I help you today?",
          userSays: "I want order some food",
          correction: "I want to order some food. (need 'to' before 'order')",
          unknownWords: ["order"]
        },
        {
          ai: "Great! What would you like to order?",
          userSays: "I like have pizza",
          correction: "I would like to have pizza. (use 'would like' for polite requests)",
          unknownWords: ["pizza"]
        },
        {
          ai: "Excellent choice! What size would you prefer?",
          userSays: "Medium size please",
          correction: "Perfect! Your sentence is correct.",
          unknownWords: []
        }
      ],
      currentMockIndex: 0
    }
  },
  computed: {
    ...mapState('speaking', ['currentScene'])
  },
  onLoad() {
    this.conversationStartTime = Date.now()
    this.addAIMessage("你好!我们开始对话练习吧。请按住麦克风按钮说话。")
    this.addAIMessage(this.mockResponses[0].ai)
  },
  onUnload() {
    this.saveConversation()
  },
  methods: {
    ...mapActions('speaking', ['saveConversation', 'addPersonalWord']),
    ...mapActions('user', ['addStudyTime']),
    startRecording() {
      this.isRecording = true
      uni.showToast({
        title: '录音中... (模拟)',
        icon: 'none',
        duration: 2000
      })
    },
    stopRecording() {
      this.isRecording = false
      
      setTimeout(() => {
        this.processUserSpeech()
      }, 500)
    },
    processUserSpeech() {
      const mock = this.mockResponses[this.currentMockIndex]
      if (!mock) {
        this.addAIMessage("对话练习结束!你做得很好。")
        return
      }
      
      this.addUserMessage(mock.userSays, mock.correction, mock.unknownWords)
      
      setTimeout(() => {
        this.currentMockIndex++
        if (this.currentMockIndex < this.mockResponses.length) {
          this.addAIMessage(this.mockResponses[this.currentMockIndex].ai)
        } else {
          this.addAIMessage("Great job! Our conversation is complete.")
        }
      }, 1000)
    },
    addUserMessage(content, correction, unknownWords) {
      this.messages.push({
        role: 'user',
        content,
        correction: correction !== content ? correction : null,
        unknownWords: unknownWords || []
      })
    },
    addAIMessage(content) {
      this.messages.push({
        role: 'ai',
        content
      })
    },
    markAsUnknown(word) {
      this.addPersonalWord({
        word: word,
        definitions: {
          cn: '(待补充释义)',
          en: ''
        },
        source: 'speaking',
        sceneId: this.currentScene.id
      })
      
      uni.showToast({
        title: `"${word}"已加入生词本`,
        icon: 'success'
      })
    },
    saveConversation() {
      const duration = Math.floor((Date.now() - this.conversationStartTime) / 60000)
      
      this.saveConversation({
        sceneId: this.currentScene.id,
        sceneName: this.currentScene.name,
        messages: this.messages,
        duration,
        timestamp: Date.now()
      })
      
      if (duration > 0) {
        this.addStudyTime(duration)
      }
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.header {
  background: white;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.scene-info {
  display: flex;
  align-items: center;
}

.scene-icon {
  font-size: 24px;
  margin-right: 10px;
}

.scene-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.chat-area {
  flex: 1;
  padding: 20px;
}

.messages {
  display: flex;
  flex-direction: column;
}

.message {
  margin-bottom: 15px;
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.ai {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
}

.message.user .message-bubble {
  background: #3cc51f;
}

.message.ai .message-bubble {
  background: white;
}

.message-text {
  font-size: 16px;
  line-height: 24px;
  display: block;
}

.message.user .message-text {
  color: white;
}

.message.ai .message-text {
  color: #333;
}

.correction {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.correction-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  display: block;
  margin-bottom: 5px;
}

.correction-text {
  font-size: 14px;
  color: white;
  line-height: 20px;
  display: block;
}

.unknown-words {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.word-tag {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.input-area {
  background: white;
  padding: 20px;
  border-top: 1px solid #f0f0f0;
}

.record-btn {
  width: 100%;
  height: 60px;
  background: #3cc51f;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.record-btn.recording {
  background: #f44336;
}

.record-icon {
  font-size: 24px;
  margin-right: 10px;
}

.record-text {
  font-size: 16px;
  color: white;
  font-weight: bold;
}

.tips {
  padding: 10px;
  background: #fff3cd;
  border-radius: 10px;
}

.tip-text {
  font-size: 12px;
  color: #856404;
  line-height: 18px;
  display: block;
}
</style>
