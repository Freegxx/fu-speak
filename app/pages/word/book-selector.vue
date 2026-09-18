<template>
  <view class="container">
    <view class="header">
      <text class="title">选择词书</text>
    </view>
    
    <view class="book-list">
      <view 
        v-for="book in books" 
        :key="book.id" 
        class="book-item"
        :class="{ selected: selectedBook && selectedBook.id === book.id }"
        @click="selectBook(book)"
      >
        <view class="book-icon">{{ book.icon }}</view>
        <view class="book-info">
          <text class="book-name">{{ book.name }}</text>
          <text class="book-desc">{{ book.description }}</text>
          <text class="book-count">{{ getWordCount(book) }} 词</text>
        </view>
        <view v-if="selectedBook && selectedBook.id === book.id" class="check-icon">✓</view>
      </view>
    </view>
    
    <view class="footer">
      <button class="confirm-btn" type="primary" @click="confirm">确认选择</button>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { WORD_BOOKS, getWordsByBookId } from '../../data/word-books.js'

export default {
  data() {
    return {
      books: WORD_BOOKS,
      tempSelected: null
    }
  },
  computed: {
    ...mapState('word', ['selectedBook']),
    ...mapGetters('speaking', ['personalVocabularyCount'])
  },
  onLoad() {
    this.tempSelected = this.selectedBook
  },
  methods: {
    ...mapActions('word', ['selectBook']),
    selectBook(book) {
      this.tempSelected = book
    },
    getWordCount(book) {
      if (book.isPersonal) {
        return this.personalVocabularyCount
      }
      return getWordsByBookId(book.id).length
    },
    confirm() {
      if (!this.tempSelected) {
        uni.showToast({
          title: '请选择一个词书',
          icon: 'none'
        })
        return
      }
      this.selectBook(this.tempSelected)
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  padding-bottom: 80px;
}

.header {
  margin-bottom: 20px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.book-list {
  display: flex;
  flex-direction: column;
}

.book-item {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.3s;
}

.book-item.selected {
  border: 2px solid #3cc51f;
}

.book-icon {
  font-size: 48px;
  margin-right: 15px;
}

.book-info {
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
  margin-bottom: 5px;
}

.book-count {
  font-size: 12px;
  color: #3cc51f;
}

.check-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background: #3cc51f;
  border-radius: 12px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.confirm-btn {
  background: #3cc51f;
  border-radius: 25px;
  height: 50px;
  font-size: 18px;
}
</style>
