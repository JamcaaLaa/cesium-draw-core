/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CESIUM_BASE_URL: string
  readonly IS_MINIFY: boolean
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
