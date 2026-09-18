<template>
  <div>
    <el-card>
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>单词管理</span>
          <el-space>
            <el-select v-model="selectedBookId" placeholder="选择词书" @change="loadWords">
              <el-option label="全部" value="" />
              <el-option v-for="book in books" :key="book.bookId" :label="book.name" :value="book.bookId" />
            </el-select>
            <el-button type="primary" @click="handleAdd">新增单词</el-button>
          </el-space>
        </div>
      </template>
      
      <el-table :data="words" border stripe>
        <el-table-column prop="wordId" label="单词ID" width="120" />
        <el-table-column prop="word" label="单词" width="150" />
        <el-table-column prop="phoneticUk" label="英式音标" width="150" />
        <el-table-column prop="definitionCn" label="中文释义" show-overflow-tooltip />
        <el-table-column prop="bookId" label="所属词书" width="120" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="单词ID">
          <el-input v-model="form.wordId" />
        </el-form-item>
        <el-form-item label="单词">
          <el-input v-model="form.word" />
        </el-form-item>
        <el-form-item label="英式音标">
          <el-input v-model="form.phoneticUk" />
        </el-form-item>
        <el-form-item label="美式音标">
          <el-input v-model="form.phoneticUs" />
        </el-form-item>
        <el-form-item label="中文释义">
          <el-input v-model="form.definitionCn" type="textarea" />
        </el-form-item>
        <el-form-item label="所属词书">
          <el-select v-model="form.bookId">
            <el-option v-for="book in books" :key="book.bookId" :label="book.name" :value="book.bookId" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const words = ref([])
const books = ref([])
const selectedBookId = ref('')
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref({
  wordId: '',
  word: '',
  phoneticUk: '',
  phoneticUs: '',
  definitionCn: '',
  bookId: ''
})

const loadWords = async () => {
  const params = selectedBookId.value ? { bookId: selectedBookId.value } : {}
  const res = await axios.get('/api/words', { params })
  words.value = res.data.data
}

const loadBooks = async () => {
  const res = await axios.get('/api/word-books')
  books.value = res.data.data
}

const handleAdd = () => {
  form.value = { wordId: '', word: '', phoneticUk: '', phoneticUs: '', definitionCn: '', bookId: '' }
  dialogTitle.value = '新增单词'
  dialogVisible.value = true
}

const handleEdit = (row) => {
  form.value = { ...row }
  dialogTitle.value = '编辑单词'
  dialogVisible.value = true
}

const handleSave = async () => {
  try {
    if (form.value.id) {
      await axios.put(`/api/words/${form.value.id}`, form.value)
    } else {
      await axios.post('/api/words', form.value)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    loadWords()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

const handleDelete = async (row) => {
  try {
    await axios.delete(`/api/words/${row.id}`)
    ElMessage.success('删除成功')
    loadWords()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

onMounted(() => {
  loadBooks()
  loadWords()
})
</script>
