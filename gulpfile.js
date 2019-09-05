const gulp = require('gulp'),
    mjml = require('gulp-mjml'),
    browserSync = require('browser-sync').create();

// MJML - https://github.com/mjmlio/mjml
gulp.task('html', function () {
    return gulp.src('src/index.mjml')
        .pipe(mjml())
        .pipe(gulp.dest('./build'))
        .on('end', browserSync.reload);
});
// WATCH
gulp.task('watch', () => {
    gulp.watch('./src/**/*.mjml', gulp.series('html'));
});

// SERVE
gulp.task('serve', () => {
    browserSync.init({
        server: './build'
    });
});

// START
gulp.task('default', gulp.series('html',
    gulp.parallel('watch', 'serve')
));
