# font-end-wheels
用于学习和记录前端知识，不做其他使用

题目目录：
- 1、debounce&throttle
防抖和节流的实现


本地安装：
```
npm i --legacy-peer-deps
```

Node环境必须升级到16版本以上，否则运行jest会报错

nvm use 16

# TODO-LIST
- 对售卖的房子和挂盘的房子，分析其描述和title中的词云，对比两者之前的差距，最终分析出什么样词云组成的房子更好售卖，价格影响因素有多大；完成
要引入分词和价格面积的特征提取。
- 将流程antv/g6控制进行迁移，同时迁移 G2(词云), L6(房子地图标注)
- 增加antd5的动态主题
- 业务主题定制 css in js 完成


# 开发注意事项
## css in js 的 styles 的类型推导
如果要使用请将样式文件的命名调整为`"\\.module\\.(c|le|sa|sc)ss$"` 就是 *.module.less 的格式。
采用的方式是在 vscode 插件中配置一下配置

> If you aren't using any plugin options, you can simple add this plugin to "typescript.tsserver.pluginPaths" in settings. You cannot provide plugin options with this approach.
>
> {
>   "typescript.tsserver.pluginPaths": ["typescript-plugin-css-modules"]
> }
为啥没有使用 tsconfig.json ？
原因是配置了但是没有生效，待后续研究
