const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    // imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    imageminGiflossy = require('imagemin-giflossy'),
    imageminPngquant = require('imagemin-pngquant'),
    del = require("del"),
    newer = require('gulp-newer');

// IMAGES
gulp.task('images', () => {
    return gulp.src('./src/img/**')
        .pipe(newer('./build/img/'))
        .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imageminGiflossy({
                    optimizationLevel: 3,
                    optimize: 3,
                    lossy: 2
                }),
                imagemin.jpegtran({progressive: true}),
                // imageminJpegRecompress({
                //     loops: 5,
                //     min: 70,
                //     max: 80,
                //     quality: 'high'
                // }),
                imageminMozjpeg({
                    progressive: true,
                    quality: 90
                }),
                imagemin.optipng({optimizationLevel: 3}),
                imageminPngquant({
                    quality: [0.6, 0.8],
                    speed: 5
                })],
            {
                verbose: true
            }
        ))
        .pipe(gulp.dest('./build/img/'))
});

// WATCH
gulp.task('watch', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.series('inky'));
    gulp.watch('./src/templates/**/*.html', gulp.series('inky'));
});

//CLEAN
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