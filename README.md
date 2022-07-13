# hm-admin

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
node_modules 项目依赖包目录
public 放在 index.html 和 favicon.ico 标题图标
src 程序员写代码的地方
.browserslistrc 代码写完之后要打包 这个文件告诉打包工具我们打包之后代码在哪些浏览器上运行 （比如打包工具一看要支持的浏览器都是高级浏览器，就不会打包类似 let,const,箭头函数）
.editorconfig 保证团队中不管用哪种编辑器 写代码风格一致
.env 开头的是环境变量 (development,production,test,staging) 可以实现 src 中 baseurl 不用去改代码，不同的环境下，值不一样
.eslintrc eslint 配置文件 我们以前在里面设置规则 值是 0 是禁用规则
.gitignore 忽略哪些文件不用上传到 github 上
babel.config.js babel 配置文件

setting.js 可以设置网站标题
permission.js 权限文件 可以设置前置路由守卫
main.js 入口文件
App.vue 根组件
views 页面组件（和路由相关）
components 公共组件
utils 工具函数 处理手机号码验证 发送 ajax 函数 request auth 本地存储 cookie
styles 样式文件
store vuex 相关
router 路由配置
icons svg 配置
assets 放图片
api 封装接口
