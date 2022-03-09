# 简介

一个简单的库，希望能在原生 JavaScript 的 CesiumJS 程序中支持简单绘图。

初期内置由 milligram 这跟简单小巧的 css 库提供的界面元素样式来辅助案例测试，后期考虑移除，只保留核心的绘图逻辑。

也就是说，这个 lib 以后会专注于绘制的逻辑，你可以在你的 React / Vue 等项目中使用，当然也可以在 VanillaJS 中使用。

# 使用

> 当前还未发布。

这个库未来会发布到 `@openspacing/cesium-draw-core`，你可以从里边儿导出 API，是带类型提示的。

``` js
import { Viewer } from 'cesium'
import { Draw } from '@openspacing/cesium-draw-core'

const viewer = new Viewer(div)
new Draw(viewer, {
  drawMode: 'Point',
  style: null, // TODO
})
```

# 开发

使用 TypeScript 开发。

本工程指定使用 pnpm 6.30 以上的版本来管理依赖，使用 vite 来进行简单页面测试，使用 rollup 进行库打包。

后期考虑将页面测试抽离此包；并考虑将 rollup 的过程全部交由 gulp 完成流程化构建。

当前仅使用 gulp 来进行 CesiumJS 静态资源文件复制，用来做开发时调试，复制的是未压缩版本。参考 `./gulpfile.js`.

## 打开测试

``` sh
pnpm demo
```

## 打包此插件

``` sh
pnpm build
```

## 更新 Cesium 后复制并更新静态文件

``` sh
pnpm static-copy
```


# 环境变量说明

- VITE_CESIUM_BASE_URL，字符串，`CesiumJS` 在开发模式与生产模式读取静态资源的 `HTTP/S` 路径，后续考虑改为 CDN 而不是 `/public` 目录。记录在 `.env` 文件中。
- VITE_IS_MINIFY，`'false'` 则不压缩，其它值一律压缩，旨在观察生产模式打包后的文件情况。记录在 `.env.[mode]` 文件中。

# 要做的

写文档。还没做。
