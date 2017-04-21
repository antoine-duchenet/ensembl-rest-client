var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var path = require('path');

var buildDir = 'build';
var indexFile = 'index.js';
var packageConfig = require('./package.json');

gulp.task('default', ['build']);

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/*.js', './test/**/*.js'], ['test']);
});

gulp.task('test', ['lint'], function() {
  return gulp.src('./test/**/*.js', {read: false})
             .pipe(mocha({reporter: 'spec'}));
})

gulp.task('build', ['test'], function() {
  return gulp.src(indexFile)
             .pipe(browserify({debug: true}))
             .pipe(rename('ensembl-rest-client.js'))
             .pipe(gulp.dest(buildDir))
             .pipe(uglify())
             .pipe(rename('ensembl-rest-client.min.js'))
             .pipe(gulp.dest(buildDir));
});
