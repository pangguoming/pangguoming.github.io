---
title: spring boot 添加 pagehelper 最新版5.0.0
date: 2018-02-07 20:25:04
tags: [spring-boot,pagehelper]
categories: 系统架构
---


### 问题描述：
现在网上搜到的spring boot 环境下mybatis集成 pagehelper插件，都是采用添加PageHeleperConfig类，如下：

```
@Configuration
public class PageHelperConfig {
 
 
 @Bean
 public PageHelper getPageHelper(){
 PageHelper pageHelper=new PageHelper();
 Properties properties=new Properties();
 properties.setProperty("helperDialect","mysql");
 properties.setProperty("reasonable","true");
 properties.setProperty("supportMethodsArguments","true");
 properties.setProperty("params","count=countSql");
 pageHelper.setProperties(properties);
 return pageHelper;
 }
 
}
```
### 原因及解决方案：
这在新版PageHeleper 5.0中是不起作用的，我们需要在配置MybatisSqlSessionFactoryBean的地方使用 PageInterceptor来配置。如下：
```
import com.github.pagehelper.PageInterceptor;

@Bean
	public MybatisSqlSessionFactoryBean mybatisSqlSessionFactoryBean() {
	MybatisSqlSessionFactoryBean mybatisPlus = new MybatisSqlSessionFactoryBean();
    //集成分页插件 pagehelper
	PageInterceptor pageInterceptor = new PageInterceptor();        
        Properties properties = new Properties();
        properties.setProperty("offsetAsPageNum", "true");
        properties.setProperty("rowBoundsWithCount", "true");
        properties.setProperty("reasonable", "true");
        properties.setProperty("supportMethodsArguments", "true");
        properties.setProperty("returnPageInfo", "check");
        pageInterceptor.setProperties(properties);
        //添加插件
        mybatisPlus.setPlugins(new Interceptor[]{pageInterceptor});

}
```
