module.exports = function () {
    $.gulp.task('scripts', () => {
        return $.gulp.src([
            './app/scripts/main.js'
            ])
            .pipe($.plugins.sourcemaps.init())
            .pipe($.plugins.concat('scripts.min.js'))
            .pipe($.plugins.terser())
            .pipe($.plugins.sourcemaps.write('./')) 
            .pipe($.gulp.dest('./build/scripts'));
    });
};