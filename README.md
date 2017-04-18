本项目基于webpack构建  命令行如下：

#### 安装依赖

---
推荐使用yarn安装项目依赖 [yarn or npm命令对比](http://www.wemlion.com/2016/npm-vs-yarn-cheat-sheet/)
	
1. 全局安装webpack     
```
yarn global add webpack |  npm i -g webpack
```
2. 安装依赖     
```
yarn | npm i
```


#### 创建项目

---
1. 创建糯米组件     
```npm run project --module=组件名称```
2. 创建Page页面     
```npm run create --module=项目名称 --page=页面名称 --filedesc=描述 [--w=page/widget]```
说明：最后一个参数指定 是新建page页面or widget块[默认page]

#### 开发中

---
1. 编译
* 本地开发      
```npm run dev --module=模块名称```

* rd开发机测试      
```npm run rd --module=模块名称```
具体发布流程参照[发布RD开发机](./docs/发布RD开发机.md)

* 性能报告      
```npm run performance --module=组件名称```
2. 调试
* BNJS注入情况说明   
在本地浏览器打开页面使用BNJS能力需在访问页面链接后添加参数need_bnjs=1   
例如：http://localhost:8081/audient/index.html?**need_bnjs=1**

* 调试工具(vconsole)   
开发中可在移动端使用vconsole查看控制台输出

BNJS及vConsole注入情况说明：
| 命令        |  调试工具        | BNJS |
| ------------- |:-------------:| -----:|
| npm run dev |  注入| 注入 |
| npm run performance| 注入   | 注入  |
| npm run rd | 注入    |   注入 |
| npm run release |--e=pro 不注入;其他情况注入|   不注入 |
| npm run create | 不注入    |   不注入 |
| npm run project | 不注入    |   不注入 |
| npm run help | 不注入    |   不注入 |

#### 发布

---
```npm run release --module=模块名称 [--e=dev|qa|pro]```   
说明：默认值pro

####其他说明文档

---
[构建工具](./docs/构建工具版本更新情况.md)

[QA文档](./docs/QA.md)

[项目目录](./docs/项目目录结构.md)

[其他调试说明](./docs/调试说明.md)



