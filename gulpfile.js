var gulp = require('gulp'),
less = require('gulp-less')
minify = require('gulp-minify'),
path = require('path'),
clean = require('gulp-clean');

gulp.task('styles', function() {
	return gulp.src('./less/**/*.less')
	.pipe(less({
		paths: [ path.join(__dirname, 'less', 'includes') ]
	}))
	.pipe(gulp.dest('./css'));
});

gulp.task('clean:scripts', function () {
  return gulp.src('js/*.min.js', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('scripts', function() {
	return gulp.src('js/*.js')
	.pipe(minify({
		ext:{
			min:'.min.js'
		},
		ignoreFiles: ['.min.js']
	}))
	.pipe(gulp.dest('js'))
});

gulp.task('build', gulp.series('styles', 'clean:scripts', 'scripts'));
