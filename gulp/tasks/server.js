module.exports = function () {
  console.log('out: ',$.output)
  $.gulp.task('server', () => {
    $.bs.init({
      server: {
        baseDir: `${$.output}`, // здесь будем собирать все файлы, поэтому отслеживаю эту папку
        startPath: './',
      },
      notify: false, // уведомления отключены
      port: 3000,
      browser: "google chrome" // можете задать любой браузер
    })
    $.gulp.watch('app/**/*.pug', $.gulp.parallel('pug')) // отслеживаем изменения, pug конвертирует, затем минифицируем и перебрасываем в dist
    $.gulp.watch('app/scss/**/*.{scss,sass}', $.gulp.parallel('styles')) // стилевые изменения не релоадим, а стримим
    $.gulp.watch('app/scripts/**/*.js', $.gulp.parallel('scripts'))
    $.gulp.watch([
      `${$.output}/**/*.html`,
      `${$.output}/scripts/**/*.js`,
    ]).on('change', $.bs.reload)
  })
}