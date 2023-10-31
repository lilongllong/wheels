# font-end-wheels
用于学习和记录前端知识，不做其他使用

# 技术体系
CSS 相关技术
- styled-components
- tailwindcss
- polished
- less
- postcss
-

JS 相关技术
- React
- TypeScript
- babel

工程化技术
- Webpack
- eslint
- jest单元测试

前端UI
- antd
- antv/g2
- antv/g6
- antv/l7
- braft.js


本地安装：
```
npm i --legacy-peer-deps
```

Node环境必须升级到16版本以上，否则运行jest会报错

nvm use 16

代码文件分析：
```
npm run analyzer
```

# TODO-LIST
- 对售卖的房子和挂盘的房子，分析其描述和title中的词云，对比两者之前的差距，最终分析出什么样词云组成的房子更好售卖，价格影响因素有多大；完成
要引入分词和价格面积的特征提取。
- 将流程antv/g6控制进行迁移，同时迁移 G2(词云), L6(房子地图标注)
- 增加antd5的动态主题
- 业务主题定制 css in js 完成

# lottie-web 动画实战
lottie是一个跨平台的动画库，通过AE（After Effects）制作动画，再通过AE插件Bodymovin导出Json文件，最终各个终端解析这个Json文件，还原动画。本文中我只介绍前端用到的库lottie-web。

Download it from from aescripts + aeplugins: https://aescripts.com/bodymovin/

官网
https://github.com/airbnb/lottie-web

个人作品
https://app.lottiefiles.com/animation/cf0f62de-7fd3-4b43-be01-b12c0a54c111?panel=download

安装：
```sh
npm install lottie-web
```

# 开发注意事项
## css in js 的 styles 的类型推导
如果要使用请将样式文件的命名调整为`"\\.module\\.(c|le|sa|sc)ss$"` 就是 *.module.less 的格式。
采用的方式是在 vscode 插件中配置一下配置

> If you aren't using any plugin options, you can simple add this plugin to "typescript.tsserver.pluginPaths" in settings. You cannot provide plugin options with this approach.
>
> {
>   "typescript.tsserver.pluginPaths": ["typescript-plugin-css-modules"]
> }
为啥没有使用 tsconfig.json
增加以下设置
```
"plugins": [{
      "name": "typescript-plugin-css-modules",
      "options": {
        "customMatcher": "\\.module\\.(c|le|sa|sc)ss$"
      }
    }],
```
## 增加了 tailwind 的原子CSS架构

## 增加 polished 的CSS工具函数，配合 styled-components 可以实现CSS 的快速编写

## 增加依赖分析工具 dependency-cruiser

按照依赖分析工具之前需要安装 graphviz

```
brew install graphviz
```

创建 依赖分析图
```
npx depcruise src --include-only "^src" --config --output-type dot | dot -T svg > dependency-graph.svg
```
参考文档：[如何解决复杂度过高的问题](https://www.sohu.com/a/552425072_121126896)

也可以安装VSCode插件: Dependency cruiser Extension


## TabNine 自动补全插件
写代码的仅仅靠 auto compelete 来进行补全还不够强大，使用 Tabnine + Tab 可以进行快速补全，养养手。


## 增加 tinyImage 的网页压缩工具


## 增加docker 和 基础mysql
```
brew install --cask --appdir=/Applications docker

```
## add movable工具
Draggable refers to the ability to drag and move targets.
Resizable indicates whether the target's width and height can be increased or decreased.
Scalable indicates whether the target's x and y can be scale of transform.
Rotatable indicates whether the target can be rotated.
Warpable indicates whether the target can be warped (distorted, bented).
Pinchable indicates whether the target can be pinched with draggable, resizable, scalable, rotatable.
Groupable indicates Whether the targets can be moved in group with draggable, resizable, scalable, rotatable.
Snappable indicates whether to snap to the guideline.
OriginDraggable* indicates Whether to drag origin.
Clippable indicates Whether to clip the target.
Roundable indicates Whether to show and drag or double click border-radius.
Support SVG Elements (svg, path, line, ellipse, g, rect, ...etc)
Support Major Browsers
Support 3d Transform
