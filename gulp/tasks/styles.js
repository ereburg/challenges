module.exports = function () {
    $.gulp.task('styles', () => {
        return $.gulp.src('./app/scss/*.{scss,sass}')
            .pipe($.plugins.sourcemaps.init()) // инициализируем карту для стилевых файлов
            .pipe($.plugins.sass({
                errorLogToConsole: true, // ошибки
                outputStyle: "compressed" // сжимаем выходной стилевой файл
            }))
            .on('error', console.error.bind(console))
            .pipe($.plugins.purgecss({
                content: ['./build/**/*.html'],
                whitelistPatterns: [
                    /open$/, 
                    /mobile$/, 
                    /hidden$/, 
                    /scroll/, 
                    /active/, 
                    /^result[a-zA-Z]*/, 
                    /^social[a-zA-Z]*/, 
                    /result$/, 
                    /neumorph/,
                    /^button[a-zA-Z]*/,
                    /^code-method[a-zA-Z]*/
                ]
            })) 
            .pipe($.plugins.autoprefixer({
                cascade: true
            })) // прописываем вендорные префиксы
            .pipe($.plugins.csso()) // минифицируем стилевой файл
            .pipe($.plugins.rename({ suffix: '.min' })) // переименовываем
            .pipe($.plugins.sourcemaps.write('./')) // записываем карту
            .pipe($.gulp.dest('./build/styles')) // кидаем в директорию сервера
            .pipe($.bs.stream()); // сервер не перезагружается, но изменения вносит 
    });
};