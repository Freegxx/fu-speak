<template>
  <view class="container">
    <view class="header">
      <text class="title">词汇量测试</text>
    </view>
    
    <view class="placeholder">
      <text class="icon">📝</text>
      <text class="text">词汇量测试功能</text>
      <text class="desc">测试题库与计分方式待设计</text>
      <text class="hint">将提供能力测评,首期不与等级强制挂钩</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
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

.placeholder {
  background: white;
  border-radius: 15px;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.text {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.desc {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.hint {
  font-size: 14px;
  color: #999;
  text-align: center;
  line-height: 22px;
}
</style>
