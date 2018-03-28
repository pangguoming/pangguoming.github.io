---
title: spring boot  shiro 抛出的UnauthorizedException 统一返回 Http状态码 401
date: 2018-02-07 20:27:48
tags: [spring-boot,shiro]
categories: 系统架构
---

### 问题描述：
spring boot 整合shiro后，如果当前用户没有操作某个资源的权限则抛出org.apache.shiro.authz.UnauthorizedException异常并返回500的HTTP状态码。这样前端只能显示后端报错，不友好。
### 解决方案：
我们可以自定义全局异常捕获处理类，即使用spring mvc的@ExceptionHandler注解来定义全局异常处理方法，又因为我们是采用spring boot所以要使用@ControllerAdvice  来修饰异常处理类。

完整代码如下：


```
import javax.servlet.http.HttpServletRequest;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice  
public class GlobalControllerExceptionHandler {   
	/*
	 * shiro 抛出的UnauthorizedException 统一返回 Http状态码 401
	 */
    @ExceptionHandler(value = UnauthorizedException.class)  
    public ResponseEntity  defaultErrorHandler(HttpServletRequest req, Exception e) throws Exception {  	
    	return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }     
}
```


当然我们也可以指定跳转到某个url（即某个jsp页面）


```
@ControllerAdvice
public class GlobalControllerExceptionHandler {
	public static final String DEFAULT_ERROR_VIEW = "pages/404";

	@ExceptionHandler(value = UnauthorizedException.class)
	public ModelAndView defaultErrorHandler(HttpServletRequest req, Exception e) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.addObject("exception", e);
		mav.addObject("url", req.getRequestURL());
		mav.setViewName(DEFAULT_ERROR_VIEW);
		return mav;
	}
}
```


### 结论：
这样发生未授权错误抛出异常时，客户端不会看到500的错误页面，而是自定义的界面。
符合我的预期