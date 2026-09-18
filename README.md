# fu-speak

面向英语学习者的通用版学习应用,核心能力为**背单词**(词书 + 间隔复习)与**练口语**(日常场景 AI 实时语音对话 + 纠错)。

## 📖 项目概述

fu-speak 是一个完整的英语学习平台,包含:

- **用户端**: uni-app 开发,支持微信小程序与 App 打包
- **管理后台**: Vue3 + Element Plus 现代化管理界面
- **后端服务**: Spring Boot 3 + MyBatis Plus RESTful API
- **产品文档**: 完整需求文档,清晰定义产品范围

## 🏗️ 仓库结构

```
fu-speak/
├── docs/              # 产品需求文档
│   └── 需求文档.md    # v0.4 产品需求定义
├── app/               # uni-app 用户端(微信小程序/App)
│   ├── pages/         # 页面:单词、口语、我的
│   ├── store/         # Vuex 状态管理
│   ├── data/          # 词书与样例数据
│   └── README.md      # uni-app 运行说明
├── server/            # Spring Boot 后端 + Vue3 管理后台
│   ├── src/           # Spring Boot 源码
│   ├── admin/         # Vue3 管理界面
│   └── README.md      # 后端运行说明
└── README.md          # 本文件
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/Freegxx/fu-speak.git
cd fu-speak
```

### 2. 启动后端服务

```bash
cd server

# 使用 Maven 启动
mvn spring-boot:run
```

访问:
- API 服务: http://localhost:8080
- H2 控制台: http://localhost:8080/h2-console

详细说明请参考 [server/README.md](server/README.md)

### 3. 启动管理后台 (可选)

```bash
cd server/admin

npm install
npm run dev
```

访问: http://localhost:8081

默认管理员:
- 用户名: `admin`
- 密码: `admin123`

### 4. 运行 uni-app 客户端

**微信小程序:**

```bash
cd app

npm install
npm run dev:mp-weixin
```

使用微信开发者工具打开 `dist/dev/mp-weixin` 目录

**H5 预览:**

```bash
cd app
npm run dev:h5
```

访问: http://localhost:8080 (自动分配端口)

详细说明请参考 [app/README.md](app/README.md)

## 📱 用户端功能 (app/)

### 三大板块

#### 1. 单词 📘
- **词书选择**: CET-4/6/英语二/我的口语生词
- **每日学习量**: 用户自定义(默认100)
- **智能复习**: 
  - 复习词优先
  - 每天至少30个新词(当有新词时)
  - 1-10 熟练度评分
  - 艾宾浩斯间隔复习算法
- **学习流程**:
  - 中英文交替出题
  - 可选输入答案
  - 音标、释义、例句展示
  - 英式/美式发音(TTS待接入)
  - 熟练度评分后自动下一题

**复习间隔规则:**
- 6分: 1-2天后复习(当日脱离门槛)
- 7分: 约14天后复习
- 8分: 约45天后复习
- 9-10分: 完全掌握,毕业

#### 2. 口语 🎤
- **日常场景**: 餐厅/购物/机场/酒店/医院/闲聊
- **实时对话**: 模拟实时语音通话形式
- **即时纠错**: 每句话 AI 立刻纠正(当前为演示模式)
- **生词收藏**: 标记不熟单词加入「我的口语生词」词书
- **对话记录**: 保存历史对话供回顾

**待接入服务:**
- 语音识别 (STT)
- AI 对话生成
- 语音合成 (TTS)

#### 3. 我的 👤
- **可选登录**: 手机号/微信(当前为演示)
- **本地优先**: 未登录数据存本地,登录后云端同步
- **等级系统**: 
  - 等级 = 累计学习小时数
  - 例: 学习50小时 = Lv.50
- **学习统计**:
  - 今日学习时长
  - 连续打卡天数
  - 月度学习日历(打卡可视化)
- **等级说明**: 详细展示学习时长统计规则
- **词汇量测试**: 待开发

**学习时长规则:**
- 计时范围: 单词页前台时间 + 口语对话时间
- 切后台暂停
- 每日有效上限: 4小时

## 🖥️ 后端与管理 (server/)

### 后端技术栈
- **框架**: Spring Boot 3.2.0
- **数据层**: MyBatis Plus 3.5.5
- **数据库**: H2 (开发) / MySQL (生产)
- **安全**: Spring Security + JWT

### 管理后台
- **框架**: Vue 3.3 + Element Plus 2.4
- **功能**:
  - 词书管理 (CRUD)
  - 单词管理 (CRUD + 批量导入)
  - 用户管理 (待完善)

### 核心 API

**词书管理:**
- `GET /api/word-books` - 获取所有词书
- `GET /api/word-books/{bookId}` - 获取单个词书
- `POST /api/word-books` - 创建词书

**单词管理:**
- `GET /api/words?bookId=cet4` - 获取指定词书的单词
- `POST /api/words/batch` - 批量导入单词

## 📚 产品文档

详细需求定义请参考: [docs/需求文档.md](docs/需求文档.md) (v0.4)

核心设计原则:
- **三个板块**: 单词/口语/我的,保持简单
- **本地优先**: 数据本地存储,登录后云端同步
- **智能复习**: 艾宾浩斯遗忘曲线 + 熟练度评分
- **实时纠错**: AI 即时语音纠正

## 🎯 当前状态

### ✅ 已完成 (v0.1 首版架构)

1. **完整仓库结构**: 单仓包含前后端、用户端、文档
2. **uni-app 客户端**: 
   - 三个 tab 完整实现
   - 单词学习流程(含熟练度UI与调度逻辑)
   - 口语练习(模拟对话演示)
   - 个人中心(等级/打卡日历)
   - 本地存储(Vuex + uni.storage)
3. **Spring Boot 后端**:
   - RuoYi 风格分层架构
   - 词书/单词 CRUD API
   - H2 内存数据库 + 样例数据
   - CORS 配置支持跨域
4. **Vue3 管理后台**:
   - 词书管理界面
   - 单词管理界面
   - Element Plus UI 组件
5. **文档齐全**:
   - 产品需求文档
   - 各模块 README
   - 运行说明

### 🚧 待开发功能

1. **真实 AI 服务接入**:
   - STT (语音识别)
   - LLM (对话生成)
   - TTS (语音合成)
   
2. **用户系统**:
   - 手机号/微信登录
   - JWT 认证
   - 云端数据同步

3. **完整词库**:
   - CET-4/6 完整词汇(当前仅样例)
   - 英语二完整词汇
   - 词汇量测试题库

4. **高级功能**:
   - 学习数据统计分析
   - 词汇掌握度报表
   - Excel 批量导入单词

## 🔧 开发建议

### 运行环境要求

- **后端**: JDK 17+, Maven 3.6+
- **管理后台**: Node.js 16+
- **uni-app**: HBuilderX 或 Node.js + uni-app CLI

### 开发流程

1. 先启动后端服务(提供 API)
2. 启动管理后台(管理词库数据)
3. 运行 uni-app 客户端(用户端开发)

### 数据准备

当前使用 H2 内存数据库,预置了:
- 3个词书(CET-4/6/英语二)
- 每个词书 2-5 个样例单词

生产环境需要:
1. 切换到 MySQL
2. 导入完整词库数据

### AI 服务接入

在 `app/pages/speaking/conversation.vue` 中:
- 替换 `mockResponses` 为真实 STT/AI 调用
- 接入真实 TTS 服务播放语音

## 📋 首期明确不做

为避免范围膨胀,**首期不包含**:
- 社交排行
- 商城
- 多语言界面国际化
- 复杂游戏化
- 超出日常场景的 AI 自由漫聊

## 🤝 参与贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

待定

## 📞 联系方式

- 仓库: https://github.com/Freegxx/fu-speak
- 问题反馈: GitHub Issues

---

**注意**: 当前为首版架构实现,AI/TTS/登录等功能使用模拟接口演示,实际接入需要配置相应服务密钥。
