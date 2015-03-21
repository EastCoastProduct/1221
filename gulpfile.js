'use strict';

var gulp    = require('gulp'),
del         = require('del'),
fs          = require('fs'),
concat      = require('gulp-concat'),
copy        = require('gulp-copy'),
filter      = require('gulp-filter'),
gzip        = require('gulp-gzip'),
htmlreplace = require('gulp-html-replace'),
rename      = require('gulp-rename'),
s3          = require('gulp-s3'),
ghPages     = require('gulp-gh-pages'),
uglify      = require('gulp-uglify');

var options = {
  headers: {'Cache-Control': 'max-age=315360000, no-transform, public'},
  gzippedOnly: true
};

// var aws = JSON.parse(fs.readFileSync('./aws.json'));

gulp.task('clean', function(cb) {
  del(['dist/**'], cb);
});

gulp.task('copy-assets', function(){
  return gulp.src(['./src/assets/**/*.{' +
    'png,gif,jpg,ico,svg,' +
    'eot,svg,ttf,woff,' +
    'pdf,' +
    'css' +
    '}'])
    .pipe(copy('./dist/assets', {prefix: 2}));
});

gulp.task('build-html', function(){
  return gulp.src('./src/**/*.html')
    .pipe(htmlreplace({
      'js': 'assets/js/bundle.min.js'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compress-js', function(){
  return gulp.src([
    './src/assets/js/jquery.js',
    './src/assets/js/bootstrap.min.js',
    './src/assets/js/plugins.js',
    './src/assets/js/jqBootstrapValidation.js',
    './src/assets/js/init.js' ])
    .pipe(concat('bundle.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'));
})

gulp.task('build', [
  'copy-assets',
  'build-html',
  'compress-js'
]);

gulp.task('publish-ghp', function(){
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('publish-s3', function(){
  return gulp.src('./dist/**')
    .pipe(gzip())
    .pipe(s3(aws, options));
});
