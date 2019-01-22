# MySQL

#### MySql 启动错误

```shell
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (62)
```
使用 `which mysql` 查看是否安装了 mysql

```shell
/usr/local/bin/mysql
```

使用 `brew info mysql` 查看 mysql 信息

```shell
mysql: stable 8.0.13 (bottled)
Open source relational database management system
https://dev.mysql.com/doc/refman/8.0/en/
Conflicts with:
  mariadb (because mysql, mariadb, and percona install the same binaries.)
  mariadb-connector-c (because both install plugins)
  mysql-cluster (because mysql, mariadb, and percona install the same binaries.)
  mysql-connector-c (because both install MySQL client libraries)
  percona-server (because mysql, mariadb, and percona install the same binaries.)
/usr/local/Cellar/mysql/8.0.13 (267 files, 236.6MB) *
  Poured from bottle on 2019-01-21 at 17:44:25
From: https://github.com/Homebrew/homebrew-core/blob/master/Formula/mysql.rb
==> Dependencies
Build: cmake ✘
Required: openssl ✔
==> Requirements
Required: macOS >= 10.10 ✔
==> Caveats
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

To have launchd start mysql now and restart at login:
  brew services start mysql
Or, if you don't want/need a background service you can just run:
  mysql.server start
==> Analytics
install: 66,396 (30 days), 186,322 (90 days), 876,018 (365 days)
install_on_request: 60,484 (30 days), 174,577 (90 days), 784,073 (365 days)
build_error: 0 (30 days)
```
根据提示启动 mysql 服务，`mysql.server start`

```shell
Starting MySQL
.. SUCCESS!
```

启动 mysql `mysql`

```shell
ERROR 1045 (28000): Access denied for user 'zhanghailing'@'localhost' (using password: NO)
```
提示没有权限，使用 sudo 启动 `sudo myql`

```shell
Password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.0.13 Homebrew

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

ok~


####   Nodejs 连接数据库 报错

错误：
```shell
Client does not support authentication protocol requested by server; consider upgrading MySQL client
```
执行：
```shell
mysql -u root -p
#接着输入你的密码

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '密码';
```
