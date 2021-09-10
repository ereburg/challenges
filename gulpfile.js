global.$ = {
  gulp: require('gulp'),
  sass: require('gulp-sass')(require('sass')),
  plugins: require('gulp-load-plugins')(), // плагин, позволяющий не прописывать каждый плагин как переменную
  bs: require('browser-sync').create(), // онлайн-сервер
  path: {
    tasks: require('./gulp/config/tasks.js') // путь к конфигу, где прописаны в котором собран массив из путей к задачам галпа
  },
  output: '.tmp'
}

const setMode = (isProduction = false) => {
  return (cb) => {
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    isProduction ? $.output = 'dist' : null
    cb()
  }
}

$.path.tasks.forEach((taskPath) => require(taskPath)()) // собираем задачи

$.gulp.task('dev', $.gulp.series(setMode(), 'clean', $.gulp.parallel($.gulp.series('pug', 'styles'), 'scripts', 'img:svg'), 'server'))
$.gulp.task('build', $.gulp.series( setMode(true), 'clean', $.gulp.parallel($.gulp.series('pug', 'styles'), 'scripts', 'img:svg')))