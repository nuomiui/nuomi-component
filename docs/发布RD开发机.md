#如何发布到rd开发机器

1. 首先发布到rd机器依赖于fis3的功能，所以您需要安装fis3

2. 然后将[receiver.php](https://github.com/fex-team/fis3-deploy-http-push/blob/master/receiver.php) 放到开发机器odp指定的webroot目录下

3. 在config.js的deploy中配置rd开发机地址

4. 最后运行npm run rd --module=xxx
