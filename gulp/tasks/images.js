module.exports = function () {
  $.gulp.task("tiny", () => {
    return $.gulp.src("./app/images/responsive/**/*.{png,jpg,jpeg}")
      .pipe($.plugins.tinypngWeb({ verbose: true }))
      .pipe($.gulp.dest("./build/images/"));
  });

  $.gulp.task("webp", () => {
    return $.gulp.src("./build/images/**/*.{png,jpg,jpeg}")
      .pipe($.plugins.webp({ quality: 80 }))
      .pipe($.gulp.dest("./build/images/"));
  });

  $.gulp.task("sprite", () => {
    return $.gulp.src("./app/images/sprite/sp-*.svg")
      .pipe($.plugins.svgstore())
      .pipe($.plugins.rename("sprite.svg"))
      .pipe($.gulp.dest("./build/images/"));
  });

  $.gulp.task("svg:remove", () => {
    return $.gulp.src("./app/images/**/*.svg")
      .pipe($.gulp.dest("./build/images/"));
  });
  
  // Responsive Images
  const quality = 80; // Responsive images quality

  // Produce @1x images
  $.gulp.task('img-responsive-1x', async function () {
    return $.gulp.src('./app/images/pictures/**/*.{png,jpg,jpeg}')
      .pipe($.plugins.newer('./app/images/responsive/@1x'))
      .pipe($.plugins.responsive({
        '**/*': { width: '50%', quality: quality }
      })).on('error', function (e) { console.log(e); })
      .pipe($.plugins.rename(function (path) { path.extname = path.extname.replace('jpeg', 'jpg'); }))
      .pipe($.gulp.dest('./app/images/responsive/@1x'));
  });
  // Produce @2x images
  $.gulp.task('img-responsive-2x', async function () {
    return $.gulp.src('./app/images/pictures/**/*.{png,jpg,jpeg}')
      .pipe($.plugins.newer('./app/images/responsive/@2x'))
      .pipe($.plugins.responsive({
        '**/*': { width: '100%', quality: quality }
      })).on('error', function (e) { console.log(e); })
      .pipe($.plugins.rename(function (path) { path.extname = path.extname.replace('jpeg', 'jpg'); }))
      .pipe($.gulp.dest('./app/images/responsive/@2x'));
  });

  $.gulp.task('img:compress', $.gulp.series('tiny', 'webp'));

  $.gulp.task('img:svg', $.gulp.series('sprite', 'svg:remove'));

  $.gulp.task('img:responsive', $.gulp.series('img-responsive-1x', 'img-responsive-2x'));

  $.gulp.task('images', $.gulp.series('img-responsive-1x', 'img-responsive-2x', 'tiny', 'webp', 'sprite', 'svg:remove'));
};