---
title: spring boot 跨域访问 及 X-XSRF-TOKEN  is not allowed 错误
date: 2018-02-07 20:41:08
tags: [spring-boot,跨域访问]
categories: 系统架构

---

### 问题描述：
在做一个服务端为spring-boot搭建的RESTful 接口的项目中，已经配置好跨域访问后，浏览器跨域访问REST接口 报错

```
Request header field X-XSRF-TOKEN is not allowed by Access-Control-Allow-Headers in preflight
```


X-XSRF-TOKEN 是HTTP防止跨站请求伪造的一种机制。
跨站请求伪造是一种通过伪装授权用户的请求来利用授信网站的恶意漏洞

### 解决方案：

在Springboot项目的跨域访问配置中，Access-Control-Allow-Headers加入X-XSRF-TOKEN 属性。
如下所示：

```
response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,X-XSRF-TOKEN");
```


完整代码：


```
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
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,X-XSRF-TOKEN");
        chain.doFilter(req, res);  
    }  
    public void init(FilterConfig filterConfig) {}  
    public void destroy() {}  
}
```

