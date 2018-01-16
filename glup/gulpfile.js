var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');
gulp.task('js',function () {
    return gulp.src('activity/js/*.js')
        .pipe($.concat('build.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe($.uglify('dist/js/*.js'))
        .pipe($.rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/js'))
        .pipe($.connect.reload());
})
gulp.task('less',function () {
    return gulp.src('activity/css/*.less')
        .pipe($.less())
        .pipe(gulp.dest('src/css'))
        .pipe($.connect.reload());
});
gulp.task('cssMin',['less'],function () {
    return gulp.src('activity/css/*.css')
        .pipe($.concat('build.css'))
        .pipe($.cleanCss())
        .pipe($.rename({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css/'))
        .pipe($.connect.reload());
});
gulp.task('htmlMin',function () {
    return   gulp.src('activity/*.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe($.connect.reload());

})
gulp.task('default',['js','less','cssMin','htmlMin'],function () {
    console.log("over");
});