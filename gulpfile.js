const gulp = require('gulp'),
    mjml = require('gulp-mjml'),
    browserSync = require('browser-sync').create(),
    del = require("del");

// MJML
gulp.task('default', function () {
    return gulp.src('index.mjml')
        .pipe(mjml())
        .pipe(gulp.dest('build'))
});

// WATCH
gulp.task('watch', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.series('inky'));
    gulp.watch('./src/templates/**/*.html', gulp.series('inky'));
});

// CLEAN
gulp.task('del', () => {
    return del(['./build']);
});

// SERVE
gulp.task('serve', () => {
    browserSync.init({
        server: './build'
    });
});

gulp.task('default', gulp.series('del','images',
    gulp.parallel('watch', 'serve')
));
