# 简介

一个简单的库，希望能在原生 JavaScript 的 CesiumJS 程序中支持简单绘图，初期内置由 millif 这跟简单小巧的 css 库提供的按钮来测试，后期考虑移除，只保留核心的绘图逻辑。

# 开发

本工程指定使用 pnpm 6.30 以上的版本来管理依赖，使用 vite 来进行简单页面测试，使用 rollup 进行库打包。

后期考虑将页面测试抽离此包，并使用 gulp 完成流程化构建。

# 环境变量说明

- VITE_CESIUM_BASE_URL，字符串，`CesiumJS` 在开发模式与生产模式读取静态资源的 `HTTP/S` 路径，后续考虑改为 CDN 而不是 `/public` 目录。记录在 `.env` 文件中。
- VITE_IS_MINIFY，`'false'` 则不压缩，其它值一律压缩，旨在观察生产模式打包后的文件情况。记录在 `.env.[mode]` 文件中。

