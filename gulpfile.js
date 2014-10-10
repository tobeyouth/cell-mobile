var gulp = require('gulp');
var react = require('gulp-react');
var stylus = require('gulp-stylus');
var browserify = require('gulp-browserify');

gulp.task('react',function () {
    return gulp.src(['src/**/**.jsx','src/**/**.js']).pipe(react()).pipe(gulp.dest('.build'));
});

gulp.task('stylus',function () {
    return gulp.src('src/**/**.styl').pipe(stylus()).pipe(gulp.dest('dist'));
});

gulp.task('browserify',function () {
    return gulp.src('.build/form/**.js')
    		.pipe(browserify({
          		"debug": !gulp.env.production
    		}))
    		.pipe(gulp.dest('dist/form'));
});


// frame
gulp.task('default',['react','stylus'],function() {
	return gulp.src('.build/frame/**.js').pipe(browserify()).pipe(gulp.dest('dist'));
});
