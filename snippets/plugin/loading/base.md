## loading插件

loading 组件以一个圆环顺时针方向运动，用来传达某一事件已经开始但尚未完成的。圆环的颜色可以是单一的或者变化的。

### 插件依赖


依赖于 http://design.yonyoucloud.com/static/uui/latest/js/u.js


### 用法

定义样式为`u-loading is-active u-loading-single-color `的div父元素

```
<div class="u-loading is-active u-loading-single-color"></div>

```

js会根据`u-loading`来定位dom，然后绑定事件。
