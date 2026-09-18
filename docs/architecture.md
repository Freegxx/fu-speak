# fu-speak 架构说明

本文档简要说明 fu-speak 项目的技术架构与目录组织。

## 仓库组织

fu-speak 采用**单仓库(Monorepo)**架构,所有代码统一管理:

```
fu-speak/
├── docs/          → 产品需求与架构文档
├── app/           → uni-app 用户端(小程序/App)
└── server/        → Spring Boot 后端 + Vue3 管理后台
```

## 技术选型

### 用户端 (app/)

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | uni-app (Vue 2.x) | 跨平台开发,支持小程序与 App |
| 状态管理 | Vuex | 统一管理学习数据 |
| 数据存储 | uni.storage | 本地优先,登录后云端同步 |
| UI | 自定义样式 | 针对学习场景优化 |

**数据流:**
```
用户操作 → Vuex Actions → Mutations → State
                ↓
        uni.storage (本地持久化)
                ↓
       (登录后) 云端同步 API
```

### 后端 (server/)

| 层级 | 技术 | 说明 |
|------|------|------|
| Web 框架 | Spring Boot 3.2 | 快速开发 RESTful API |
| ORM | MyBatis Plus 3.5 | 简化数据库操作 |
| 数据库 | H2 / MySQL | 开发用内存库,生产切 MySQL |
| 安全 | Spring Security + JWT | 认证与授权 |
| 分层 | Controller → Service → Mapper | 清晰的三层架构 |

**请求流程:**
```
HTTP Request → Controller → Service → Mapper → Database
                   ↓
            统一响应格式
                   ↓
               JSON Response
```

### 管理后台 (server/admin/)

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | Vue 3.3 | Composition API |
| UI 库 | Element Plus 2.4 | 企业级组件库 |
| 路由 | Vue Router 4 | 单页应用路由 |
| HTTP | Axios | 与后端 API 交互 |
| 构建 | Vite 4 | 快速热更新 |

## 目录映射

### app/ 对应三大板块

```
app/pages/
├── word/          → 「单词」板块
│   ├── word.vue           # 词书选择与学习概览
│   ├── book-selector.vue  # 选择词书页
│   └── learning.vue       # 单词学习页(核心)
├── speaking/      → 「口语」板块
│   ├── speaking.vue       # 场景选择
│   ├── conversation.vue   # 实时对话页(核心)
│   └── history.vue        # 对话记录
└── profile/       → 「我的」板块
    ├── profile.vue         # 个人中心(核心)
    ├── level-info.vue      # 等级说明
    └── vocabulary-test.vue # 词汇量测试
```

### server/ 后端模块

```
server/src/main/java/com/fuspeak/
├── controller/    → RESTful API 端点
│   ├── WordBookController.java  # 词书管理
│   └── WordController.java      # 单词管理
├── service/       → 业务逻辑层
├── mapper/        → 数据访问层(MyBatis)
├── entity/        → 数据库实体
└── config/        → 配置类(Security/CORS)
```

### server/admin/ 管理界面

```
server/admin/src/
├── views/         → 页面组件
│   ├── WordBooks.vue  # 词书管理页
│   ├── Words.vue      # 单词管理页
│   └── Users.vue      # 用户管理页
├── router/        → 路由配置
└── App.vue        → 根组件(侧边菜单布局)
```

## 数据库设计

核心表关系:

```
word_book (词书)
    ├─ 1:N → word (单词)
    └─ 1:N → user_word_progress (用户单词进度)

sys_user (用户)
    ├─ 1:N → user_word_progress (学习进度)
    ├─ 1:N → speaking_conversation (对话记录)
    └─ 1:N → study_history (学习历史)
```

详细结构见 `server/src/main/resources/schema.sql`

## 核心算法

### 单词复习调度 (app/store/modules/word.js)

**熟练度 → 下次复习间隔:**
- 1-5分: 0.5-1天
- 6分: 2天 (当日脱离门槛)
- 7分: 14天
- 8分: 45天
- 9-10分: 毕业,不再复习

**每日队列生成:**
1. 获取所有需要复习的词(nextReviewAt <= 今天)
2. 获取未学过的新词
3. 优先填充复习词
4. 若有新词,至少加入30个
5. 总量不超过用户设定的每日学习量

### 学习时长统计 (app/store/modules/user.js)

- 页面进入时记录开始时间
- 页面离开时计算时长
- 每日有效上限4小时
- 累计时长(小时) = 用户等级

## 接口规范

### 统一响应格式

```json
{
  "code": 200,
  "msg": "success",
  "data": { ... }
}
```

### 分页参数

```
GET /api/words?bookId=cet4&page=1&size=20

Response:
{
  "code": 200,
  "data": [...],
  "total": 100
}
```

## 部署架构

### 开发环境

```
┌─────────────┐
│  开发机本地   │
├─────────────┤
│ uni-app     │ :8080 (H5) / 微信开发者工具
│ Vue3 Admin  │ :8081
│ Spring Boot │ :8080 API + H2 Database
└─────────────┘
```

### 生产环境(建议)

```
┌──────────────┐      ┌──────────────┐
│ 微信小程序/App │  →  │  CDN / OSS   │ (静态资源)
└──────────────┘      └──────────────┘
         ↓
┌──────────────────────────────────────┐
│           API Gateway / Nginx         │
└──────────────────────────────────────┘
         ↓                      ↓
┌─────────────────┐    ┌─────────────────┐
│ Spring Boot API │    │ Vue3 Admin      │
│ (容器化部署)     │    │ (Nginx静态托管)  │
└─────────────────┘    └─────────────────┘
         ↓
┌─────────────────┐
│  MySQL 主从      │
└─────────────────┘
```

## 扩展性考虑

### 多租户支持
当前单租户设计,如需支持多机构:
- 在核心表添加 `tenant_id` 字段
- 配置 MyBatis Plus 多租户插件

### 缓存层
高并发场景可引入:
- Redis 缓存热点词书数据
- 用户会话状态缓存

### 消息队列
异步任务处理:
- 用户学习数据异步上报
- AI 对话记录异步持久化

### 微服务拆分
当业务复杂度提升,可拆分为:
- 用户服务 (User Service)
- 词库服务 (Word Service)
- 口语服务 (Speaking Service)
- 学习记录服务 (Progress Service)

## 相关文档链接

- [产品需求文档](需求文档.md) - 完整功能定义
- [uni-app 运行说明](../app/README.md) - 客户端开发指南
- [后端运行说明](../server/README.md) - 后端与管理后台
