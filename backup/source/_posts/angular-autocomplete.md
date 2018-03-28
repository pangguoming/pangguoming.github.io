---
title: AngularJS 联想输入框：angular-autocomplete
date: 2018-02-22 22:03:32
tags: spring-cloud,angualrjs]
categories: 前端

---


本项目使用AngularJS实现一个联想输入框功能。当用户输入字符、字符串时能够按照输入的字符（串）自动匹配列表中最相似的条目，并以下拉列表形式显示出来。

本项目创建了一个可重复使用的AngularJS指令（Drictive），只需要引入指令所在的js文件，然后在HTML中使用指令即可。
此联想输入框的数据可以来自远程的REST API，并且可以使用Promise。

项目源码：[源码](https://github.com/pangguoming/angular-autocomplete)

效果参见： [demo](http://pangguoming.com/angular-autocomplete/) 

## 安装

使用本联想输入框，您需要先载入AngularJS，比如从下面Google的CDN载入：

```html
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.12/angular.min.js"></script>
```

当然还需要载入样式表文件:

```html
  <link rel="stylesheet" href="style/autocomplete.css">
```

然后我们就可以将本项目中的angular-autocomplete.js载入到您的网页中了:

```html
<script type="text/javascript" src="script/angular-autocomplete.js"></script>
<script type="text/javascript" src="script/app.js"></script>
```

下一步，我们需要将angular-autocomplete这个依赖注入到我们的angularjs应用中:

```javascript
var app = angular.module('app', ['autocomplete']);
```

## 使用方法

如果想要在自己的页面中添加此联想输入框，只需要将`<autocomplete>` 添加到您的HTML某一位置中，并且使用 `data` 属性来绑定列表数据，当然，这个列表数据必须在当前视图的controller的$scope下。

当我们需要从REST API来获取远程服务端返回的数据来填充联想输入框的下拉列表数据时，我们可以使用`on-type`属性，`on-type`可以绑定一个js方法，此方法可以用于请求REST API并将返回的数据放入 `data` 中来动态改变列表数据。

### 参数、属性

`data` : 将数组传递给autocomplete指令. 数组应该在当前视图controller的 $scope of your controller内。

`on-type` : *(可选)* 用于指定一个js方法，当键入内容时会接收更改。 它传递键入或删除的字符的完整字符串到指定的js方法中。 您可以使用它来更新您在数据中传递的数组。P

`on-select` : *(可选)* 用于指定一个js方法数，当选择一个联想到的列表项时，将出发此js方法。 它传递了完整的建议字符串。

`click-activation` : *(可选)* 当'true'时，联想下拉框会在点击时打开（不幸的是，在大多数浏览器中，onfocus没有正确实现）。 默认情况下，只有在您开始输入内容时才会激活它。

`ng-model`: 用于将当前input框中的内容绑定到某个变量上，此变量必须在当前视图controller的 $scope 中。

`attr-placeholder`: *(可选)* 设置`input`d placeholder。

`attr-class`: *(可选)* 修改内部 `div`元素的样式class。

`attr-id`: *(可选)* 修改内部 `div` 元素的id, 参见 `attrs-class`.

`attr-input-class`: *(可选)* 设置`input`元素的样式class。

`attr-input-id`: *(可选)* 修改`input` 元素的id, 参见 `attrs-input-class`.

`autocomplete-required`: *(可选)* 类似 `ng-required` 属性要求input框非空。

`no-auto-sort`: *(可选)* 防止js库自动将列表中的数据按照字母顺序排序。

## 例子

HTML:
```html
    <div ng-controller="MyCtrl">
      <autocomplete ng-model="yourchoice" data="movies" on-type="updateMovies"></autocomplete>
    </div>
```

JavaScript:
```javascript
	var app = angular.module('app', ['autocomplete']);

	app.controller('MyCtrl', function($scope, MovieRetriever){
		$scope.movies = ["Lord of the Rings",
		 				"Drive",
		 				"Science of Sleep",
		 				"Back to the Future",
		 				"Oldboy"];

		// gives another movie array on change
		$scope.updateMovies = function(typed){
			// MovieRetriever could be some service returning a promise
		    $scope.newmovies = MovieRetriever.getmovies(typed);
		    $scope.newmovies.then(function(data){
		      $scope.movies = data;
		    });
		}
	});

```




