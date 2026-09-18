<template>
  <div>
    <el-card>
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>词书管理</span>
          <el-button type="primary" @click="handleAdd">新增词书</el-button>
        </div>
      </template>
      
      <el-table :data="books" border stripe>
        <el-table-column prop="bookId" label="词书ID" width="150" />
        <el-table-column prop="name" label="名称" width="200" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="icon" label="图标" width="80" align="center" />
        <el-table-column prop="wordCount" label="单词数" width="100" align="center" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="词书ID">
          <el-input v-model="form.bookId" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" />
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

const books = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref({
  bookId: '',
  name: '',
  description: '',
  icon: '',
  wordCount: 0
})

const loadBooks = async () => {
  const res = await axios.get('/api/word-books')
  books.value = res.data.data
}

const handleAdd = () => {
  form.value = { bookId: '', name: '', description: '', icon: '', wordCount: 0 }
  dialogTitle.value = '新增词书'
  dialogVisible.value = true
}

const handleEdit = (row) => {
  form.value = { ...row }
  dialogTitle.value = '编辑词书'
  dialogVisible.value = true
}

const handleSave = async () => {
  try {
    if (form.value.id) {
      await axios.put(`/api/word-books/${form.value.id}`, form.value)
    } else {
      await axios.post('/api/word-books', form.value)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    loadBooks()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

const handleDelete = async (row) => {
  try {
    await axios.delete(`/api/word-books/${row.id}`)
    ElMessage.success('删除成功')
    loadBooks()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

onMounted(() => {
  loadBooks()
})
</script>
