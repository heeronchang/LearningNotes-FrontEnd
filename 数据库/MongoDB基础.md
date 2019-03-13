<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [MongoDB 基础](#mongodb-基础)
			- [MongoDB 基本概念](#mongodb-基本概念)
			- [使用](#使用)
			- [Mongoose](#mongoose)
				- [安装](#安装)
				- [使用](#使用)

<!-- /TOC -->

# MongoDB 基础

#### MongoDB 基本概念
- 数据库
- 集合（表）
- 文档（表记录）

#### 使用


#### Mongoose
##### 安装
`npm i mongoose`
##### 使用

1. **连接 dbname 数据的名字，如果不存在，则会在插入文档的时候一并创建**

```javascript
cont mongoose = require('mongoose')

// 连接 dbname 数据的名字，如果不存在，则会在插入文档的时候一并创建
mongoose.connect('mongodb://localhost/dbname', {
  useNewUrlParser: true
})

```
2. **定义 schema，在 mongoose 中，一切都源于一个 Schema。每一个 Schema 定义一个 Collection 或者 documents 的规则。**

```javascript
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  email: {
    type: String
  }
})

```
添加额外的 key 到 Schema
```javascript
userSchema.add({
  age: Number
})
```
添加 function，注意不要覆盖 mongoose 默认的方法，不要使用 ES6 的箭头函数（this 指向问题）。
```javascript
// 实例方法
userSchema.methods.speak = function() {
  var greeting = this.name ? "Meow nam is" + this.name : "I don't hava a name.";
  console.log(greeting);
}

// 静态方法
userSchema.statics.findName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i')}, cb);
}

User.findName('heeron', function(err, res) {
  // ...
})
```

可用 SchemaType：
- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map


3. **创建 model**

第一个参数需要大写字母开头，最后会自动生成一个复数的 collection，eg：users
```javascript
var User = mongoose.model('User', userSchema)
```

4. **插入数据**

```javascript
var heeron = new User({
  username: 'heeron',
  password: 'hee123456',
  email: 'heeron@heeron.com'
})

heeron.save(function(err, res){
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
})
```

5. **查询**

```javascript
User.find({
  username: 'heeron'
}, function(err, res) {
  // ...
})

// 正则匹配查询，第二个参数指定要查询的字段
User.find({
  username: /^heeron/i 
}, 'username email', function(err, res) {
  // ...
})
```
