1.需要在permissions字段，申请右键菜单的权限contextMenus
2.在background字段，通过scripts字段指定后台执行的js文件
3.contextMenus
```js
    chrome.contextMenus.create()//创建
    chrome.contextMenus.update()//更新
    chrome.contextMenus.remove()//移除
```