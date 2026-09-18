# fu-speak Server

fu-speak 后端服务,基于 Spring Boot 3 + MyBatis Plus 构建,提供 RESTful API 和管理后台。

## 技术栈

### 后端 (Spring Boot)
- **框架**: Spring Boot 3.2.0
- **数据层**: MyBatis Plus 3.5.5
- **数据库**: H2 (开发) / MySQL (生产)
- **安全**: Spring Security + JWT
- **构建工具**: Maven

### 管理后台 (Vue3)
- **框架**: Vue 3.3
- **UI库**: Element Plus 2.4
- **路由**: Vue Router 4
- **HTTP**: Axios
- **构建工具**: Vite 4

## 目录结构

```
server/
├── src/main/
│   ├── java/com/fuspeak/
│   │   ├── FuSpeakApplication.java    # 应用入口
│   │   ├── config/                     # 配置类
│   │   ├── controller/                 # 控制器
│   │   ├── entity/                     # 实体类
│   │   ├── mapper/                     # MyBatis Mapper
│   │   └── service/                    # 业务逻辑
│   └── resources/
│       ├── application.yml             # 主配置文件
│       ├── schema.sql                  # 数据库结构
│       └── data.sql                    # 初始数据
├── admin/                              # Vue3 管理后台
│   ├── src/
│   │   ├── views/                      # 页面组件
│   │   ├── router/                     # 路由配置
│   │   ├── App.vue                     # 根组件
│   │   └── main.js                     # 入口文件
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── pom.xml                             # Maven 配置
└── README.md
```

## 快速开始

### 前置要求

- JDK 17+
- Maven 3.6+
- Node.js 16+ (管理后台)

### 1. 启动后端服务

```bash
cd server

# 使用 Maven 运行
mvn spring-boot:run

# 或者先打包再运行
mvn clean package
java -jar target/fuspeak-server-0.1.0.jar
```

启动成功后:
- API 服务: http://localhost:8080
- H2 控制台: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:fuspeak`
  - 用户名: `sa`
  - 密码: (空)

### 2. 启动管理后台

```bash
cd server/admin

# 安装依赖
npm install

# 开发运行
npm run dev
```

访问: http://localhost:8081

默认管理员账号:
- 用户名: `admin`
- 密码: `admin123`

## 核心功能模块

### 1. 词书管理

**接口:**
- `GET /api/word-books` - 获取所有词书
- `GET /api/word-books/{bookId}` - 获取单个词书
- `POST /api/word-books` - 创建词书
- `PUT /api/word-books/{id}` - 更新词书
- `DELETE /api/word-books/{id}` - 删除词书

**预置词书:**
- 大学英语四级 (cet4)
- 大学英语六级 (cet6)
- 英语二 (english2)

### 2. 单词管理

**接口:**
- `GET /api/words?bookId={bookId}&page=1&size=20` - 获取单词列表
- `GET /api/words/{wordId}` - 获取单个单词
- `POST /api/words` - 创建单词
- `PUT /api/words/{id}` - 更新单词
- `DELETE /api/words/{id}` - 删除单词
- `POST /api/words/batch` - 批量创建单词

**单词数据结构:**
```json
{
  "wordId": "cet4_001",
  "word": "abandon",
  "phoneticUk": "/əˈbændən/",
  "phoneticUs": "/əˈbændən/",
  "definitionCn": "v. 放弃;遗弃",
  "definitionEn": "to leave somebody/something behind",
  "examples": "[{\"en\":\"...\",\"cn\":\"...\"}]",
  "bookId": "cet4"
}
```

### 3. 用户管理

**待开发功能:**
- 用户注册与登录
- 学习进度同步
- 学习时长统计
- 口语对话记录

## 数据库设计

### 核心表

1. **sys_user** - 用户表
   - 基础信息、等级、学习时长

2. **word_book** - 词书表
   - 词书ID、名称、描述、单词数

3. **word** - 单词表
   - 单词、音标、释义、例句、所属词书

4. **user_word_progress** - 用户单词进度表
   - 学习记录、复习时间、熟练度

5. **speaking_conversation** - 口语对话记录
   - 场景、时长、对话内容

6. **study_history** - 学习历史记录
   - 每日学习时长统计

## 配置说明

### application.yml 关键配置

```yaml
spring:
  datasource:
    # H2 内存数据库(开发)
    url: jdbc:h2:mem:fuspeak
    
  # 生产环境切换为 MySQL
  # datasource:
  #   url: jdbc:mysql://localhost:3306/fuspeak
  #   username: root
  #   password: yourpassword

jwt:
  secret: your-jwt-secret-key
  expiration: 604800000  # 7天

cors:
  allowed-origins: http://localhost:8081
  # 生产环境添加实际域名
```

## API 响应格式

统一响应格式:
```json
{
  "code": 200,
  "msg": "success",
  "data": { ... }
}
```

## 开发指南

### 添加新的实体

1. 在 `entity/` 目录创建实体类
2. 使用 `@TableName` 注解指定表名
3. 使用 MyBatis Plus 注解配置字段映射

### 添加新的 API

1. 创建 Controller 继承 BaseController (可选)
2. 使用 `@RestController` 和 `@RequestMapping`
3. 注入对应的 Service
4. 返回统一格式的响应

### 数据库迁移

生产环境建议:
1. 修改 `application.yml` 使用 MySQL
2. 执行 `schema.sql` 创建表结构
3. 根据需要导入初始数据
4. 禁用 `spring.sql.init.mode`

## RuoYi 风格说明

本项目参考 RuoYi-Vue3 架构设计:
- **分层清晰**: Controller → Service → Mapper
- **MyBatis Plus**: 简化 CRUD 操作
- **统一响应**: 标准化 API 返回格式
- **Spring Security**: 安全认证框架
- **Vue3 + Element Plus**: 现代化管理界面

与完整 RuoYi 的差异:
- 简化了权限系统 (RBAC待开发)
- 简化了代码生成器
- 专注于 fu-speak 业务场景

## 生产部署

### 后端部署

```bash
# 打包
mvn clean package -DskipTests

# 运行
java -jar target/fuspeak-server-0.1.0.jar \
  --spring.profiles.active=prod \
  --spring.datasource.url=jdbc:mysql://your-db:3306/fuspeak
```

### 管理后台部署

```bash
cd admin
npm run build

# 将 dist/ 目录部署到 Nginx 或其他静态服务器
```

## 后续开发建议

1. **用户认证** - 完善 JWT 登录、手机号/微信登录
2. **云端同步** - 用户学习数据上传下载
3. **AI 接口** - 接入 STT/TTS/LLM 服务
4. **权限管理** - 实现完整的 RBAC
5. **数据统计** - 学习分析、词汇掌握度报表
6. **批量导入** - Excel 批量导入单词

## 常见问题

### H2 数据重启丢失?
内存模式下数据会丢失,生产环境请使用 MySQL。

### CORS 跨域问题?
检查 `application.yml` 中的 `cors.allowed-origins` 配置。

### Maven 依赖下载慢?
配置国内镜像源 (阿里云 Maven)。

## 技术支持

- 仓库: https://github.com/Freegxx/fu-speak
- 文档: docs/需求文档.md
