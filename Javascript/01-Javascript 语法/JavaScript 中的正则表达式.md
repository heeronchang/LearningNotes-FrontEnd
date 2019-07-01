# JavaScript 正则表达式

JS 中正则表达式相较于等效的字符串运算，有显著的性能优势

## JS 中处理正则的方法有：
- regexp.exec
- regexp.test
- string.match
- string.replace
- string.search
- string.split

### 栗子🌰
```JavaScript

  var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

  var url = "http://www.ora.com:80/goodparts?q#fragment";
  var result = parse_url.exec(url);

  console.log(result); // ["http://www.ora.com:80/goodparts?q#fragment", "http", "//", "www.ora.com", "80", "goodparts", "q", "fragment", index: 0, input: "http://www.ora.com:80/goodparts?q#fragment", groups: undefined]

  var blanks = '                ';
  var names = ['url', 'schema', 'slash', 'host', 'port', 'path', 'query', 'hash'];

  for (let i = 0; i < names.length; i+= 1) {
    console.log(`${names[i]}: ${result[i]}`);
    // output
    /*
        url: http://www.ora.com:80/goodparts?q#fragment
        regex.html:27 schema: http
        regex.html:27 slash: //
        regex.html:27 host: www.ora.com
        regex.html:27 port: 80
        regex.html:27 path: goodparts
        regex.html:27 query: q
        regex.html:27 hash: fragment
      */
  }
  
```

#### 解析：

`/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/`

- `(?:([A-Za-z]+):)?`

匹配一个协议名，以 `:` 结尾的时候才能匹配。
`(?:...)` 表示一个非捕获型分组。
后缀 `?` 表示分组是可选的，它表示重复 0 次或 1 次。

`(...)` 表示一个捕获型分组。一个捕获型分组将复制它所匹配的文本，并将其放入 `result` 数组中。每个捕获型数组都将被指定一个编号。
第一个捕获型分组的编号是 1，所以该分组所匹配的文本拷贝将出现在 `result[1]` 中。

`[...]` 表示一个字符类。`A-Za-z` 表示26个大写字母和26个小写字母。`-` 连接符，表示范围从 A 到 Z。后缀 `+` 表示这个字符类将被匹配一次或多次。
最后的 `:` 将按字面文字进行匹配。

- `(\/{0, 3})` 捕获型分组。表示 `/` 将被匹配 0 到 3 次。
- `([0-9.\-A-Za-z]+)` 捕获型分组。表示匹配一次以上的由 字母、数字、`.` 、`-` 组成的字符串。
- `(?::(\d+))?` 非捕获型分组。匹配 前缀 `:` 和一个或多个数字组成的字符串。后缀 `?` 表示可选。
- `(?:\/([^?#]*))?` 非捕获型分组。匹配一个 `/` 开始，`[^?#]` 表示除了 `?` 和 `#` 的所有字符， `*` 表示这个字符匹配 0 或多次。后缀 `?` 表示可选。
- `(?:\?([^#]*))?` 非捕获型分组。以 `?` 开始，包含 0 或多个非 `#` 字符。后缀 `?` 表示可选。
- `(?:#(.*))?` 非捕获型分组。以 `#` 开始，任意多个除换行符外的字符。`.` 表示非换行符 `\n`。






