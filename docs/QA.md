### QA文档

####一.如何开启监听者和页面参数自动补全
1. config.js
    ```audient:true```
2. 页面参数具体写法
	```//@params xxxkey=xxxvalue```

  按上述步骤操作后，可直接在output/audient/pages.json中，查看响应页面的qs参数，快速得知页面所需参数，此功能主要作用是方便后期项目维护

####二. 开发阶段如何切换请求地址
config.js

		proxy: {
        host: '0.0.0.0',
        proxy: [{
            context: ['/bnnserver'],
            target: '开发环境指向域名',
            headers: {
                Host: 'bnhbp.nuomi.com',
                'Access-Control-Allow-Origin': '*'
            },
            secure: false
        }]
    }

####三.如何开启手机扫码调试
1. 本地安装web-server

2. 将webserver的根目录指向项目的output 文件夹

3. 点击<img src="./docs/imgs/audient.png"/>

4. 手机扫码二维码


####四.如果不想将webserver的documentroot指定到output下（例如我项目跟还有很多其他项目）怎么办？
方法一：

    上边只是最快捷的方式，你可以在当前项目跟下更改webserverRoot(默认:'')

    例如：

    （类Unix系统）你的webserver跟路径是/Users/memoryza/nuomi,而当前项目路径是/Users/memoryza/nuomi/channel(项目名称)

    （windows）你的webserver跟路径是d:/work,而当前项目路径是d:/work/channel


    这时候可以将webserverRoot: /channel/output

    指定的路径是浏览器的路径符号(/)跟操作系统无关

    这里是一次性操作，请不要反复如果需要反复更改，则删除output/audient目录

方法二：
    ```npm install -g http-server ```

    然后在output下 http-server -p 80

    然后扫码访问

####五.如何处理跨域请求
1. config.js
 可以进行api的配置进行跨域处理(如何配置:https://github.com/chimurai/http-proxy-middleware)

2. chrome安装扩展程序 Allow-Control-Allow-Origin，所有请求都可以跨域



