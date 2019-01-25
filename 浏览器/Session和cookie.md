# session 和 cookie

本来 session  是一个抽象的概念，开发者为了实现中断和继续等操作，将 user agent 和 server
之间一对一的交互，抽象为“会话”进而衍生出”会话状态“，就是 session 概念。

而 cookie 是一个实际存在的东西， http 协议中定义在 header 中的字段。可以认为是 session
的一种后端无状态实现。

今天常说的 session 是为了绕开 cookie 的各种限制，通常借助 cookie 本身和后端存储实现，
一种更高级的会话状态实现。session 因为 session id 的存在，通常要借助 cookie 实现，但这并非必要
只能说通用性较好的一种实现方案。

- session 在服务器端，cookie 在客户端（浏览器）
- sessoin 默认被存在服务器的一个文件里（不是内存）（根据服务器不同）
- session 的运行依赖 session id，而 session id 存在 cookie 中，也就是说，如果浏览器禁用了
cookie，同时 session 也会失效（但是可以通过其它方式实现，比如在 url 中传递 session id）
- session 可以存放在文件、数据库、内存中。
- 用户验证这种场合一般会用 session，restful 中一般会使用 access_token，这个 token 和 session id 类似。

#### session 和 session 实现

####
