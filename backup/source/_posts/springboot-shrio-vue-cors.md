---
title: spring boot shiro vue webpack 跨域及shiro无法获取登陆用户解决方案
date: 2018-01-10 19:13:58
tags: [spring-boot,shiro,vue.js]
categories: 系统架构

---


### 问题描述
我的项目是前后端分离架构，前端采用vue搭建单页应用，后端采用spring boot搭建Restful服务，运行在localhost:8181
服务端， 用spring boot 搭建，配合使用shiro权限框架，发布Restful 接口
客户端是 vue cli搭建 由webpack 做代理,运行在localhost:8080，这样就是跨域访问服务端了。

目前遇到的问题是：用户登录正常，登录后 发现 session丢失，无法再获取当前登陆用户。
查看web浏览器 发现 cookie中JSESSION 登陆后发生变化，断定问题应该出现在客户端
客户端采用 vue-axio 库来处理 Http请求，
因为要使用http请求的来认证权限，所以必须开启axio的认证凭证功能
axios.defaults.withCredentials = true ;
但设置完后，还是出现session丢失。

经过调研找到原因和解决方案。


### Spring boot服务端配置

*注：Spring boot服务端项目源码在：https://github.com/pangguoming/spring-boot-restful-demo*

首先服务端需要配置开启跨域访问，这个配置和普通sevlet配置跨域访问没什么区别，唯一注意的就是采用Spring boot的配置方式（配置类要添加@Componet注解）

```
/*跨域请求拦截器，文件位置：spring-boot-restful-demo/src/main/java/com/rjhy/cloud/common/config/CorsFilter.java*/
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component  
public class CorsFilter implements Filter {  
  
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(CorsFilter.class);  
  
    /*跨域请求配置*/
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {  
        HttpServletResponse response = (HttpServletResponse) res;  
  
        HttpServletRequest reqs = (HttpServletRequest) req;  
  
        response.setHeader("Access-Control-Allow-Origin",reqs.getHeader("Origin"));  
        response.setHeader("Access-Control-Allow-Credentials", "true");  
        response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");  
        response.setHeader("Access-Control-Max-Age", "5000");  
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        chain.doFilter(req, res);  
    }  
    public void init(FilterConfig filterConfig) {}  
    public void destroy() {}  
}
```

配置完服务端跨域后，在对服务端的网络请求已经允许使用跨域访问了。

接下来有个**坑**！

因为我们采用Shiro做安全框架，shiro框架通过判断每个网络请求携带的cookie来唯一确定用户身份。
但axios通过浏览器发送跨域请求的时候POST、PUT、DELETE操作之前，会先发OPTIONS请求（为啥先发OPTIONS，请参见），并且此OPTIONS请求是不带cookie的，这导致shiro框架无法获取到cookie来确定用户身份而抛出403异常，然后请求终止，并不再响应接下来的POST、PUT、DELETE请求，GET请求可正常使用。

解决办法：

为shiro创建一个单独处理OPTIONS请求的过滤器，功能是凡是OPTIONS请求，统统强制正常返回（也就是返回HTTP 200 响应），代码如下：


```
/*Shiro自定义过滤器文件，文件位置：spring-boot-restful-demo/src/main/java/com/rjhy/cloud/common/config/ShiroFilter.java*/
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.web.servlet.AdviceFilter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;

@Component
public class ShiroFilter extends AdviceFilter {
	@Override
	protected boolean preHandle(ServletRequest servletRequest, ServletResponse servletResponse) throws Exception {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;
		if (request.getMethod().equals(RequestMethod.OPTIONS.name())) {
			response.setStatus(HttpStatus.OK.value());
			return false;
		}
		return super.preHandle(request, response);
	}
}
```


   
```
/*将自定义shiro过滤器注册到shiro配置中，文件位置：spring-boot-restful-demo/src/main/java/com/rjhy/cloud/common/config/ShiroConfiguration.java 第136行*/
    ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
    shiroFilter.setSecurityManager(securityManager);
        
```


### vue客户端配置

*注：客户端项目源码在：https://github.com/pangguoming/iview-admin*

使用Vue cli创建的项目一般都是由webpack做请求代理，网上有些人说要去配置webpack的proxyTable，但经过本人尝试，不需要配置。只需要配置axios的参数即可，axios的配置最重要的就是axios.defaults.withCredentials = true ；我的代码如下

```
/*axios配置，文件位置：iview-admin/src/vendors/axios.js*/
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8181/';
axios.defaults.withCredentials = true ;
```
这样就可以跨域从Vue客户端 发送POST、PUT、DELETE、GET方法了。

问题完美解决！（得意的笑声中.......）

