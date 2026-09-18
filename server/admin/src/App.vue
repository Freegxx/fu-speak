<template>
  <div id="app">
    <el-container style="height: 100vh">
      <el-aside width="200px" style="background: #545c64">
        <div style="padding: 20px; color: white; font-size: 18px; font-weight: bold">
          fu-speak 管理
        </div>
        <el-menu
          :default-active="$route.path"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/word-books">
            <span>词书管理</span>
          </el-menu-item>
          <el-menu-item index="/words">
            <span>单词管理</span>
          </el-menu-item>
          <el-menu-item index="/users">
            <span>用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="background: #fff; box-shadow: 0 1px 4px rgba(0,21,41,.08)">
          <h2>fu-speak 管理后台</h2>
        </el-header>
        
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}
</style>
