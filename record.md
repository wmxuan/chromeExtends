# 插件---浏览器扩展
##### [文档](http://chrome.cenchy.com/contextmenus.html)
### 什么是插件
    所谓的浏览器插件，其实应该叫做浏览器扩展程序，英文名为chrome extension
    插件是压缩在一起的一组文件，包括html,css,js脚本，图片等文件
    插件就是web页面，支持浏览器所有的API,从XMLHttpRequest到HTML5等
    插件可以于web页面交互，活着通过Ajax与服务器交互
    插件可以访问浏览器提供的内部功能，例如标签或书签等

插件的本质---由HTML,CSS,JS,图片等组员组成的，一个.crx的压缩包

### 常见的插件类型
    控制页面内容：广告屏蔽插件（Adblock Plus），页面样式优化（简悦）
    开发者工具控制台：vue-devtools
    下载媒体资源：音频/视频下载，图片批量下载
    浏览器小工具：抢票插件，前端工具助手（FeHelper）
    翻墙插件：拦截网络请求，配置代理（谷歌访问助手）
    新标签页替换：替换默认的新标签页（掘金浏览器插件）
### 手把手教你写插件
 #### 准备
     chrome浏览器
     vscode
     更多工具 - 扩展程序 - 开发者模式打开 - 加载已解压的扩展程序 - 选择文件
 #### manifest.json配置文件
  ```js
  "manifest_version":2,// 清单文件的版本，必填，且必须是2
  "name":"demo",//插件的名称，必填
  "version":"1.0.0",//插件的版本，必填
  "description":"今夏的插件",//插件的描述
  "icons":{
      "16":"XXX.png",//右上角使用
      "48":"XXX.png",//扩展管理页面使用
      "128":"XXX.png"//应用商店详情页使用
  },// 图标，优先级比较低
  "background":{
      //两种指定方式，只能选择一种
    //   "page":"XXX.html",
    "script":["XXX.js"],
    "persistent":true,//是否常驻后台，默认true，常见于后台程序插件
  },// 常驻后台的JS或页面
"browser_action":{
    "default_icon":"XXX.png",//优先级高于icons
    "default_title":"悬停的标题"，//图标悬停时的标题
    "default_popup":"popup.html"
},
// "page_action":{
//     "default_icon":"XXX.png",
//     "default_title":"我是XXX",
//     "default_popup":"popup.html"
// },
// 浏览器右上角图标设置，browser_action，page_action 二选一，区别：page_actions默认图标是灰色的，当某些特定页面打开才激活图标，动态设置：chrome.browserAction.seIcon(),setBadgeText(),setBadgeBackgroundColor()
"content_scripts":[
    {

    }
],
"chrome_url_overrides":{
    "bookmarks":"chrome://bookmarks",//书签管理页
    "history":"chrome://history",//历史记录页
    "newTab":"chrome://newTab",//新打开的标签页，例如掘金扩展
},//override替代页，替换某些特定页面，替代页通常会有大量的CSS,JS代码
"content_scripts":[
    {
        //页面匹配规则：“matches”:["http://*/*","https://*/*"],

        //http://*/*                        匹配任何http协议的URL
        //http://*/foo*                     匹配任何使用http协议的任何域名下，只要以/foo开头的URL
        //https://*.google.com/foo*bar      匹配任何使用https协议的google.com域名或其下子域名，只要路径是以/foo开头，以bar结尾的URL
        //http://example.org/foo/bar.html   匹配指定的url
        //file:///foo*                      匹配以/foo开头的任意本地文件
        //http://127.0.0.1/*                匹配任意以http协议的主机ip是127.0.0.1的URL
        //*://mail.google.com/*             匹配任意以http(s)://mail.google.com开头的URL
        //匹配所有认可的协议的URL
        //"<all_urls>"表示匹配所有地址
        "matches":["<all_urls>"],
        //多个js按顺序注入
        "js":["js/jquery-1.8.3.js","js/content-script.js"],
        //js的注入可以随便一点，但是css的注入就要小心，因为可能影响全局样式
        "css":["css/custom.css"],
        //代码注入的时间，可选值："document_start","document_end","document_idle",最后一个表示页面空闲时，默认最后一个
        "run_at":"document_start"
    },
    //配置可以设置多个规则
    {
        "matches":["*://*/*.png","*://*/*.jpg","*://*/*.gif","*://*/*.bmp"],
        "js":["js/show-image-content-size.js"]
    }
],//页面内容注入，修改页面
//1.matches:匹配模式，必填
//2.css:数组，按顺序注入css文件，页面样式渲染前注入
//3.js:数组，按顺序注入，可用run_at控制注入时机
//4.run_at:注入时机
//（1）：document_idle:默认选项，浏览器自主决定以优化速度
//（2）：document_start:没创建dom,没运行任何脚本时注入
//（3）：创建dom后，ready后load前注入，页面js先执行
//5.all_frames:true/false,是否注册所有的frame
"permissions":[
    "contentMenus",//右键菜单
    "tabs",//标签
    "notifications",//通知
    "webRequest",//web请求
    "webRequestBlocking",
    "storage",//插件本地存储
],//权限申请，实现插件功能所需要的权限，值为数组，申请以后才可以调用相应的权限。
// activeTab 允许用户在调用扩展时，临时访问当前活动的选项卡
// background 后台权限，可以用来增加chrome运行时间，即开机即运行
// bookmarks 书签操作权限
// browsingDate 浏览器数据操作权限，主要用来清除浏览器数据 cookie storage等
// contentSettings 浏览器设置权限
// contextMenus 上下文菜单添加权限
// cookies cookie的查询，修改，onChange监听
// history 浏览器历史记录操作权限
// storage chrome.storage 的使用权限（注意不是浏览器的localStorage）
// tabs 选项卡权限，允许创建、修改、重新排列选项卡
// webNavigation 请求进行过程中的操作权限
// webRequest | webRequestBlocking 开放正在运行的请求的拦截、阻塞或修改权限
"homepage_url":"http://baidu.com",//设置插件的主页
"options_page":"options.html",
//chrome40以前的插件配置页写法
"options_ui":{
    "page":"options.html",
    //添加一些默认的样式，推荐使用
    "chorme_style":true
},
//chrome40以后的插件配置页写法，如果2个都写，新版chrome只认后面这一个
"devtools_page":"devtools.html"
//devtools页面入口，注意只能指向一个html文件，不能是js文件
```
