import {
  RollupOptions,
  Plugin,
} from "rollup/dist/rollup"
import del from 'rollup-plugin-delete'
import resolve from '@rollup/plugin-node-resolve'
import ts from '@rollup/plugin-typescript'
import css from 'rollup-plugin-postcss'
import sourceMaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import filesize from 'rollup-plugin-filesize'

const isMinifined = process.env.ismin === 'yes'

/*
 resolve 插件指的是你需要把 node_modules 中导入的资源（模块、文件等）一起打包进去；
 配置中的 external 数组是不打包的 pkg；
 若不使用 resolve 插件，默认全部忽略导入的资源
 */

const basePlugins: Plugin[] = [
  del({
    targets: 'dist/*',
    runOnce: true
  }),
  resolve(),
  ts({
    include: ["./src/**/*"],
    sourceMap: true,
  }),
  css({
    extract: true,
    minimize: isMinifined,
    sourceMap: true
  }),
  sourceMaps()
]

const forDebugOutputPlugins: Plugin[] = [
  terser(),
  filesize(),
]

const plugins: Plugin[] = [
  ...basePlugins,
].concat(isMinifined ? forDebugOutputPlugins : [])


const rollupConfigs: RollupOptions[] = [
  {
    input: "src/index.ts",
    plugins: plugins,
    external: [
      'cesium'
    ],
    output: [
      {
        format: "esm",
        file: "dist/esm/index.js",
        sourcemap: true,
        globals: {
          cesium: 'Cesium'
        }
      },
      {
        format: "umd",
        file: "dist/umd/cesium-draw.js",
        name: "CesiumDraw",
        sourcemap: true,
        globals: {
          cesium: 'Cesium'
        }
      }
    ]
  },
  {
    input: "src/index.ts",
    // terser 压缩不了 d.ts，也没必要压缩 d.ts
    plugins: plugins
      .filter((plg) => !(['terser', 'filesize', 'postcss']
      .includes(plg.name)))
      .concat(dts(), css()),
    // external 表示你 import 的 package 哪些不需要打包
    external: [
      'cesium'
    ],
    output: {
      format: "umd",
      file: "dist/types/index.d.ts",
      sourcemap: true,
      // globals 表示打包结果中原来哪些包改成了全局变量（globalThis）下的什么变量
      // 这里，cesium 映射为 'Cesium'，就意味着打包后是 `globalThis['Cesium']`
      globals: {
        cesium: 'Cesium'
      }
    }
  }
]

export default rollupConfigs
