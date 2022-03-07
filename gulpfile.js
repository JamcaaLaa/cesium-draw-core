import gulp from 'gulp'
import del from 'del'

const taskName = process.argv[2]

console.log(`=== Task: ${taskName} will running ===`)

const staticCopyTask = () => {
  del('./demo/public/**/*')

  return gulp
    .src('./node_modules/cesium/Build/CesiumUnminified/**/*')
    .pipe(gulp.dest('./demo/public'))
}
staticCopyTask.displayName = 'static-copy'
staticCopyTask.description = '复制 CesiumJS 的静态文件到 demo/public 目录下'

export { staticCopyTask }
