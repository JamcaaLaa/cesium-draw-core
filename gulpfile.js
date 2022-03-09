import gulp from 'gulp'
import del from 'del'

const taskName = process.argv[2]

console.log(`=== Task: ${taskName} will running ===`)

const deleteTargets = [
  'Assets/**/*',
  'ThirdParty/**/*',
  'Widgets/**/*',
  'Workers/**/*',
  'Cesium.d.ts',
  'Cesium.js',
  'Cesium.js.map'
]

const staticCopyTask = () => {
  del(deleteTargets.map((src) => `./demo/public/${src}`))
  
  const baseDir = `./node_modules/cesium/Build/CesiumUnminified`

  return gulp
    .src([`${baseDir}/!(Scene)/**/*`, `${baseDir}/Cesium*`])
    .pipe(gulp.dest('./demo/public'))
}
staticCopyTask.displayName = 'static-copy'
staticCopyTask.description = '复制 CesiumJS 的静态文件到 demo/public 目录下'

export { staticCopyTask }
