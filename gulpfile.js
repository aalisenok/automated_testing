const gulp = require('gulp');
    mjml = require('gulp-mjml'),
    // browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminZopfli = require('imagemin-zopfli'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    newer = require('gulp-newer'),

        imageminGiflossy = require('imagemin-giflossy');
// del = require("del"),

gulp.task('default', function () {
    return gulp.src('index.mjml')
        .pipe(mjml())
        .pipe(gulp.dest('build'))
});


// IMAGES
gulp.task('images', () => {
    return gulp.src('./src/img/**')
        .pipe(newer('./build/img/'))
        .pipe(imagemin([
            imageminPngquant({
                speed: 5,
                quality: [0.6, 0.8]
            }),
            imageminZopfli({
                more: true
            }),
            imageminMozjpeg({
                progressive: true,
                quality: 70
            })
            ,
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3,
                lossy: 2
            }),
        ]))
        .pipe(gulp.dest('./build/img/'))
});

// WATCH
// gulp.task('watch', () => {
//     gulp.watch('./src/scss/**/*.scss', gulp.series('inky'));
//     gulp.watch('./src/templates/**/*.html', gulp.series('inky'));
// });

//CLEAN
// gulp.task('del', () => {
//     return del(['./build']);
// });

// SERVE
// gulp.task('serve', () => {
//     browserSync.init({
//         server: './build'
//     });
// });

// gulp.task('default', gulp.series('del','images',
//     gulp.parallel('watch', 'serve')
// ));