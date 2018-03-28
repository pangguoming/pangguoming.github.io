---
title: Vue 自定义指令实现权限
date: 2018-01-10 19:13:08
tags: [vue.js]
categories: 前端

---


*注：以下代码片段可以从：
https://github.com/pangguoming/iview-admin
中找到*

### 服务端返回权限字符串数组
在登陆后服务端返回的用户信息中有权限信息permissions,其JSON内容如下：

```
permissions:[ "KT Admin","sys.role", "sys.user.add", "dict.dictclass.view", "dict.dictclass.add", "sys.permission", "sys.permission.edit", "sys.user.view", "sys"]
```

### Vue保存权限字符串数组
Vue客户端获上面JSON对象后，存入cookie中（也可以存在sessionStorage、localStorage中）

```
/*代码位置/src/views/login.vue*/
Cookies.set('access', response.data.result.permissions);
```

### 创建自定义权限指令
创建permission.js文件

```
/*代码位置/src/directive/permission.js*/
import Vue from 'vue';
import Cookies from 'js-cookie';
import Util from '@/libs/util';
Vue.directive('permission', {
    bind: function (el, binding, vnode) {
      let access = JSON.parse(Cookies.get('access'));
      let intersectionSet = new Set([...new Set(itAccess)].filter(x => new Set(currentAccess).has(x)));
       if (intersectionSet.size==0) {//用来判断用户的权限字符串数组与指令所在元素上的权限字符串数组是否有交集
           el.style.display="none";
       }      
    }
  })
```

### 使用自定义权限指令

在vue主文件main.js中引入permission即可生效：

```
/*代码位置/src/main.js*/
import permission from './directive/permission'
```

其中cookies.get('access')用来取出当前用户的权限字符串数组


```
/*代码位置/src/views/demo/demo-crud.vue*/
<Button v-permission="['KT Admin']" type="error" @click="removeAll" >批量删除</Button>
```


如果，用户权限数组有 'KT Admin' 权限，则此按钮显示否则不显示。
