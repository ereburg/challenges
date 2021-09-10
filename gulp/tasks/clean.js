module.exports = function () {
  const del = require('del')

  $.gulp.task('clean', (cb) => del(['.tmp', 'dist']).then(() => cb()))
};