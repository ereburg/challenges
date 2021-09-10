module.exports = function () {
  $.gulp.task('pug', () => {
    return $.gulp.src('app/pug/*.pug')
      .pipe($.plugins.pug({
        pretty: true
      }))
      .pipe($.plugins.htmlmin({
        collapseWhitespace: true
      }))
      .pipe($.gulp.dest(`${$.output}`))
      .pipe($.bs.stream()) // сервер не перезагружается, но изменения вносит
  })
}