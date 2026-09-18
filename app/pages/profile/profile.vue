<template>
  <view class="container">
    <view class="user-card">
      <view v-if="!isLoggedIn" class="not-logged">
        <image class="avatar" src="../../static/default-avatar.png" mode="aspectFill"></image>
        <text class="login-tip">登录后数据云端同步</text>
        <view class="login-buttons">
          <button class="login-btn" @click="loginWithPhone">手机号登录</button>
          <button class="login-btn wechat" @click="loginWithWechat">微信登录</button>
        </view>
      </view>
      
      <view v-else class="logged">
        <image class="avatar" :src="userInfo.avatar || '../../static/default-avatar.png'" mode="aspectFill"></image>
        <view class="user-info">
          <text class="username">{{ userInfo.nickname || '用户' }}</text>
          <text class="level">{{ displayLevel }}</text>
        </view>
      </view>
    </view>
    
    <view class="stats-card">
      <view class="stat-item">
        <text class="stat-label">累计学习</text>
        <text class="stat-value">{{ studyHours }} 小时</text>
      </view>
      <view class="stat-item">
        <text class="stat-label">今日学习</text>
        <text class="stat-value">{{ todayMinutes }} 分钟</text>
      </view>
      <view class="stat-item">
        <text class="stat-label">连续打卡</text>
        <text class="stat-value">{{ streakDays }} 天</text>
      </view>
    </view>
    
    <view class="calendar-card">
      <view class="calendar-header">
        <text class="calendar-title">{{ currentMonth }}月学习日历</text>
      </view>
      <view class="calendar-grid">
        <view 
          v-for="day in calendarDays" 
          :key="day.date"
          class="calendar-day"
          :class="getDayClass(day)"
        >
          <text class="day-number">{{ day.day }}</text>
        </view>
      </view>
      <view class="calendar-legend">
        <view class="legend-item">
          <view class="legend-color yellow"></view>
          <text class="legend-text">&lt;10分钟</text>
        </view>
        <view class="legend-item">
          <view class="legend-color light-green"></view>
          <text class="legend-text">10-30分钟</text>
        </view>
        <view class="legend-item">
          <view class="legend-color deep-green"></view>
          <text class="legend-text">≥30分钟</text>
        </view>
      </view>
    </view>
    
    <view class="menu-list">
      <view class="menu-item" @click="goToLevelInfo">
        <text class="menu-icon">📊</text>
        <text class="menu-text">等级说明</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="goToVocabTest">
        <text class="menu-icon">📝</text>
        <text class="menu-text">词汇量测试</text>
        <text class="menu-arrow">›</text>
      </view>
      <view v-if="isLoggedIn" class="menu-item" @click="logout">
        <text class="menu-icon">🚪</text>
        <text class="menu-text">退出登录</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      currentMonth: new Date().getMonth() + 1,
      calendarDays: [],
      streakDays: 0
    }
  },
  computed: {
    ...mapState('user', ['isLoggedIn', 'userInfo', 'studyTime', 'studyHistory']),
    ...mapGetters('user', ['displayLevel', 'todayStudyTime', 'getDayColor']),
    studyHours() {
      return Math.floor(this.studyTime / 60)
    },
    todayMinutes() {
      return this.todayStudyTime
    }
  },
  onShow() {
    this.generateCalendar()
    this.calculateStreak()
  },
  methods: {
    ...mapActions('user', ['login', 'logout']),
    loginWithPhone() {
      uni.showToast({
        title: '手机号登录待实现',
        icon: 'none'
      })
    },
    loginWithWechat() {
      uni.showToast({
        title: '微信登录待实现',
        icon: 'none'
      })
      
      setTimeout(() => {
        this.login({
          nickname: '测试用户',
          avatar: ''
        })
      }, 1000)
    },
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗?',
        success: (res) => {
          if (res.confirm) {
            this.$store.dispatch('user/logout')
            uni.showToast({
              title: '已退出登录',
              icon: 'success'
            })
          }
        }
      })
    },
    goToLevelInfo() {
      uni.navigateTo({
        url: '/pages/profile/level-info'
      })
    },
    goToVocabTest() {
      uni.navigateTo({
        url: '/pages/profile/vocabulary-test'
      })
    },
    generateCalendar() {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      
      this.calendarDays = []
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day).toISOString().split('T')[0]
        this.calendarDays.push({
          day,
          date,
          isToday: day === now.getDate()
        })
      }
    },
    getDayClass(day) {
      const classes = []
      if (day.isToday) classes.push('today')
      
      const minutes = this.studyHistory[day.date] || 0
      if (minutes > 0) {
        if (minutes < 10) classes.push('yellow')
        else if (minutes < 30) classes.push('light-green')
        else classes.push('deep-green')
      }
      
      return classes.join(' ')
    },
    calculateStreak() {
      const dates = Object.keys(this.studyHistory).sort().reverse()
      let streak = 0
      const today = new Date().toISOString().split('T')[0]
      
      for (let i = 0; i < dates.length; i++) {
        const date = dates[i]
        if (i === 0 && date !== today) break
        
        const expectedDate = new Date()
        expectedDate.setDate(expectedDate.getDate() - i)
        const expected = expectedDate.toISOString().split('T')[0]
        
        if (date === expected && this.studyHistory[date] >= 10) {
          streak++
        } else {
          break
        }
      }
      
      this.streakDays = streak
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

.user-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 20px;
}

.not-logged {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logged {
  display: flex;
  align-items: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: white;
  margin-bottom: 15px;
}

.logged .avatar {
  margin-bottom: 0;
  margin-right: 20px;
}

.login-tip {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.login-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-btn {
  background: white;
  color: #667eea;
  border-radius: 25px;
  font-size: 16px;
}

.login-btn.wechat {
  background: #09bb07;
  color: white;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
}

.level {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.stats-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.calendar-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
}

.calendar-header {
  margin-bottom: 15px;
}

.calendar-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 15px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #f5f5f5;
}

.calendar-day.today {
  border: 2px solid #667eea;
}

.calendar-day.yellow {
  background: #ffd54f;
}

.calendar-day.light-green {
  background: #9ccc65;
}

.calendar-day.deep-green {
  background: #558b2f;
}

.calendar-day.deep-green .day-number {
  color: white;
}

.day-number {
  font-size: 12px;
  color: #333;
}

.calendar-legend {
  display: flex;
  justify-content: space-around;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-color.yellow {
  background: #ffd54f;
}

.legend-color.light-green {
  background: #9ccc65;
}

.legend-color.deep-green {
  background: #558b2f;
}

.legend-text {
  font-size: 11px;
  color: #666;
}

.menu-list {
  display: flex;
  flex-direction: column;
}

.menu-item {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.menu-icon {
  font-size: 24px;
  margin-right: 15px;
}

.menu-text {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.menu-arrow {
  font-size: 24px;
  color: #ccc;
}
</style>
