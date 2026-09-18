<template>
  <view class="container">
    <view class="header">
      <text class="title">等级说明</text>
    </view>
    
    <view class="level-card">
      <text class="current-level">{{ displayLevel }}</text>
      <text class="level-desc">累计学习 {{ studyHours }} 小时</text>
    </view>
    
    <view class="info-section">
      <text class="section-title">📈 等级计算规则</text>
      <view class="info-card">
        <text class="info-text">• 等级与累计学习时长直接挂钩</text>
        <text class="info-text">• 每学习1小时,等级提升1级</text>
        <text class="info-text">• 例如:学习50小时 = Lv.50</text>
      </view>
    </view>
    
    <view class="info-section">
      <text class="section-title">⏱ 学习时长统计规则</text>
      <view class="info-card">
        <text class="info-text"><text class="highlight">计时范围:</text></text>
        <text class="info-text">• 单词学习页在前台停留的时间</text>
        <text class="info-text">• 口语对话进行中的时间</text>
        <text class="info-text"></text>
        <text class="info-text"><text class="highlight">暂停计时:</text></text>
        <text class="info-text">• App切到后台时自动暂停</text>
        <text class="info-text"></text>
        <text class="info-text"><text class="highlight">防挂机机制:</text></text>
        <text class="info-text">• 每日有效学习时长上限为4小时</text>
        <text class="info-text">• 超出部分不计入等级</text>
        <text class="info-text">• 超出部分不影响打卡颜色</text>
      </view>
    </view>
    
    <view class="info-section">
      <text class="section-title">📅 打卡颜色规则</text>
      <view class="info-card">
        <view class="color-rule">
          <view class="color-box yellow"></view>
          <text class="color-text">黄色:学习时长 &lt; 10分钟</text>
        </view>
        <view class="color-rule">
          <view class="color-box light-green"></view>
          <text class="color-text">浅绿:学习时长 10-30分钟</text>
        </view>
        <view class="color-rule">
          <view class="color-box deep-green"></view>
          <text class="color-text">深绿:学习时长 ≥ 30分钟</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['studyTime']),
    ...mapGetters('user', ['displayLevel']),
    studyHours() {
      return Math.floor(this.studyTime / 60)
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
  margin-bottom: 20px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.level-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.current-level {
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
}

.level-desc {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.info-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  display: block;
}

.info-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
}

.info-text {
  font-size: 14px;
  color: #666;
  line-height: 24px;
  display: block;
}

.highlight {
  font-weight: bold;
  color: #333;
}

.color-rule {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.color-rule:last-child {
  margin-bottom: 0;
}

.color-box {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 15px;
}

.color-box.yellow {
  background: #ffd54f;
}

.color-box.light-green {
  background: #9ccc65;
}

.color-box.deep-green {
  background: #558b2f;
}

.color-text {
  font-size: 14px;
  color: #333;
}
</style>
