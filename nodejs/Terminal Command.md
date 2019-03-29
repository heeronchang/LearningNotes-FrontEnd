## 终端命令

### 列出当前系统打开文件的工具

`lsof [options] filenam`

#### 查看端口占用

`lsof -i tcp:8080`

```
COMMAND：进程的名称
PID：进程标识符
USER：进程所有者
FD：文件描述符，应用程序通过文件描述符识别该文件。如cwd、txt等 TYPE：文件类型，如DIR、REG等
DEVICE：指定磁盘的名称
SIZE：文件的大小
NODE：索引节点（文件在磁盘上的标识）
NAME：打开文件的确切名称
```

杀死进程 

`kill PID`

