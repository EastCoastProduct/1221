'use strict';

var gulp    = require('gulp'),
del         = require('del'),
fs          = require('fs'),
concat      = require('gulp-concat'),
copy        = require('gulp-copy'),
filter      = require('gulp-filter'),
ghPages     = require('gulp-gh-pages'),
gzip        = require('gulp-gzip'),
htmlreplace = require('gulp-html-replace'),
minifyCSS   = require('gulp-minify-css'),
rename      = require('gulp-rename'),
s3          = require('gulp-s3'),
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
    '}',
    '!./src/assets/img/_stock/**/*'])
    .pipe(copy('./dist/assets', {prefix: 2}));
});

gulp.task('build-html', function(){
  return gulp.src('./src/**/*.html')
    .pipe(htmlreplace({
      'js': 'assets/js/bundle.min.js',
      'css': 'assets/css/main.min.css'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compress-style', function(){
  return gulp.src(['./src/assets/css/**/*.css'])
    .pipe(concat('main.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('compress-js', function(){
  return gulp.src([
    './src/assets/js/jquery.js',
    './src/assets/js/bootstrap.min.js',
    './src/assets/js/plugins.js',
    './src/assets/js/jqBootstrapValidation.js',
    './src/assets/js/init.js' ])
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'));
})

gulp.task('build', [
  'copy-assets',
  'build-html',
  'compress-style',
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
