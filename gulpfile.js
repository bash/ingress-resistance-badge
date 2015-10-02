/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */
var gulp = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('build', function(){
    return gulp.src('src/index.js')
        .pipe(browserify({ global: false, transform: ['babelify'] }))
        .on('error', console.log)
        .pipe(gulp.dest('js/'))
});

gulp.task('watch', function(){
   return gulp.watch('src/**/*.js', ['build']);
});