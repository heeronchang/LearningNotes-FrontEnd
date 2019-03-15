# Mongoose

## 概念
- Schema： 一种以文件形式存储的数据模型骨架，不具备数据库操作能力
- Model：有 Schema 编译而形成的构造器，具有抽象属性和行为。Model 的每一个实例（instance）就是一个 document
- instance：由 Model 创建的实例

## 安装

`npm i mongoose`

## 使用

### 连接数据库

连接 dbname 数据的名字，如果不存在，则会在插入文档的时候一并创建

```javascript
cont mongoose = require('mongoose')

// 连接 dbname 数据的名字，如果不存在，则会在插入文档的时候一并创建
mongoose.connect('mongodb://localhost/dbname', {
  useNewUrlParser: true
})

```
### 定义 Schema

在 mongoose 中，一切都源于一个 Schema。对应 MongoDB 中的集合 Collection，数据库的表结构。

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

### Schema 配置项

有两种添加配置项的方式
```javascript
// 1
new Schema({...}, optinos);
// 2
let schema = new Schema({...});
schema.set(option, value);
```
有效的配置：
1. autoIndex(默认 true)
2. capped
3. collection
4. id ，_id(默认 true)
5. shardKey strict(默认 true)
6. toJSON
7. toObject
8. versionKey
9. typeKey
10. validateBeforeSave
11. skipVersioning
12. timestamps
13. useNestedStrict
14. retainKeyOrder

#### autoIndex

自动索引。应用开始的时候 mongoose 对每一个索引发送一个 ensureIndex 命令。索引默认（_id）被 Mongoose 创建。

#### bufferCommands

管理 mongoose 连接关闭的时候重连。

#### capped

上限设置。如果数据库有批量操作，该属性可以限制一次操作的数量。
```javascript
new Schema({...}, {capped: 1024}); // 一次操作上限 1024 条数据
new Schema({...}, {capped: { size: 1024, max: 100, autoIndexId: true }});
```

#### collection

集合名。在 MongoDB 中默认使用 Model 的名字作为集合名。自定义集合名：
```javascript
const schema = new Schema({...}, {collection: 'yourname'});
```

#### _id

如果 Schema 中没有定义 _id 域（field），mongoose 会默认分配一个 _id (field) ，类型是 ObjectId 。

设置这个字段后，再使用 Schema.set('_id', false) 无效。

#### id

mongoose 分配给每一个 Schema 一个虚拟属性 id ， 它是一个 getter 方法。返回 _id 转换为字符串后的值。

#### safe

safe: true 表示在操作的时候，需要等待 MongoDB 返回的结果，比如 update ， 要返回影响的条数，才往后执行，如果
safe: false 则表示不用等到结果就可以向后执行。
```javascript
new Schema({...}, {safe: false});
new schema({...}, safe: {j: 1, w: 2, wtimeout: 10000}) [mongodb的write concern](https://kyfxbl.iteye.com/blog/1952941)
```

#### shardKey 

MongoDB 做分布式使用。

#### strict

默认 enabled ， 如果实例中的域 （field）在 Schema 中不存在，那么这个域不会被插入到数据库。

#### toObject

true 时，默认对这个 Schema 所有的实例都有作用，不需要实例手动调用。
```javascript
let schema = new Schema({ name: String });
schema.path('name').get(function(v) {
  return v + ' is my name.';
});

schema.set('toObject', { getters: true });
let Person = mongoose.model('Person', schema);
let p = new Person({ name: 'Max Headroom' });
console.log(p); // { _id:fjoiefjo23offefejfofeojf, name: 'Max Headroom is my name.' }
```

#### toJSON

和 toObject 类似，但是只有当实例调用了 toJSON 方法后，才起作用。

```javascript
let schema = new Schema({ name: String });
schema.path('name').get(function(v) {
  return v + ' is my name.';
});

schema.set('toJSON', { getters: true, virturals: false });
let Person = mongoose.model('Person', schema);
let p = new Person({ name: 'Max Headroom' });
console.log(p.toJSON); // { _id:fjoiefjo23offefejfofeojf, name: 'Max Headroom is my name.' }
```

#### typeKey 

#### validateBeforeSave

默认文档在保存到数据库到时候会自动验证，这是为了防止无效到文档。如果想要手动验证，并且能够保存没有通过验证的文档。可以设置这个属性为 false。
```javascript
const schema = new Schema({ name: String });
schema.set('validateBeforeSave', false);
schema.path('name').vialidate(function(value) {
  return v != null;
});

const Person = mongoose.model('Person', shcema);
const p = new Person({ name: null });
p.validate(function(error) {
  console.log(error);
});
p.save();
```

#### versionKey

版本锁设置在每一个文档（document）上，由 mongoose 生成，默认值是 __v ，可自定义。

```javascript
const schema = new Schema({ name: String });
const Person = mongoose.model('Person', schema);
const p = new Person({ name: 'Tom' });
p.save(); // { __v: 0, name: 'Tom' }

// 自定义版本锁
const schema = new Schema({ name: String }, { versionKey: 'DiyKey' });
const Person = mongoose.model('Person', schema);
const p = new Person({ name: 'Tom' });
p.save(); // { DiyKey: 0, name: 'Tom' };
```

#### skipingVersion

#### timestamps

如果 schema 设置了这个选项，createdAt updatedAt 域将会被自动添加到文档中，默认类型是 Date，默认名是 createdAt updatedAt ，可自定义名称。

```javascript
const schema = new Schema({...}, { timestamps: { createdAt: 'created_at' }});
const Person = mongoose.model('Person', schema);
const p = new Person({ name: 'tom' });
p.save(); // { created_at: '时间', name: 'tom' }
```

#### useNestedStrict

在 mongoose 4 中，upate() 和 findOneAndUpdate() 方法只检查顶级 schema 的 strict 的选项值。

#### retainKeyOrder

默认地，mongoose 会转换实体中键的顺序，retainKeyOrder 可以确保 mongoose 不会改变键的顺序。

### 创建 model

第一个参数需要大写字母开头，最后会自动生成一个复数的 collection，eg：users
```javascript
var User = mongoose.model('User', userSchema)
```

### 索引

MongoDB 支持二级索引，定义索引有两种方式：路径级别和 Schema 级别
```javascript
const animalSchema = new Schema({
  name: String,
  type: String,
  tags: {
    type: [String],
    index: true // field level
  }
})

animalSchema.index({
  name: 1,
  type: -1
}) // Schema level, 1 是正序， -1 是倒叙
```
如果要建立复合索引，在 Schema 级别建立。索引或者复合索引能让搜索更加高效，默认索引就是主键索引 ObjectId ，
属性名为 _id。

数据库中主要就是 CRUD 操作，建立索引可以提高查询速度（R），但是过多的索引会降低 CUD 操作
[8天学通MongoDB——第四天 索引操作](http://www.cnblogs.com/huangxincheng/archive/2012/02/29/2372699.html)

### 虚拟属性

Schema 定义的虚拟属性不会写入数据库。
```javascript
const personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});

// 虚拟属性
personSchema.virtual('name.full').get(function() {
  return this.name.first + ' ' + this.name.last;
});

personSchema.virtual('name.full').set(function() {
  const split = name.split(' ');
  this.name.first = split[0];
  this.name.last = split[1];
})

const Person = mongoose.model('Person', personSchema);
const Tom = new Person();
Tom.name.full = 'Tom Green';
console.log(Tom.name.full); // Tom Green
console.log(Tom.name.first); // Tom
console.log(Tom.name.last); // Green
```

### 插入数据

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

// or
User.create(heeron, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    res.speak();
  }
});
```

### 查询数据

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

### 修改数据

```javascript
User.findByIdAndUpdate('5c8b4b66351eb905a4f2232c', { password: 'cr7123456' }, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

User.findOneAndUpdate({ username: 'CR7' }, { password: 'cr712345' }, { useFindAndModify: false }, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});
```

### 删除数据

```javascript
User.findByIdAndDelete('5c456409e567bdac5566c89d', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

User.findByIdAndRemove('5c455c63c99f22ac07ee5d71', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});
```