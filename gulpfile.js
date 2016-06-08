var postcss = require('gulp-postcss'),
    gulp = require('gulp'),
    browserify = require('browserify'),
    eslint = require('gulp-eslint'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    csswring = require('csswring'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    postcssnested = require('postcss-nested'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babel = require('gulp-babel'),
    util = require('gulp-util'),
    babelify = require('babelify');



gulp.task('css', function () {
    var processors = [
        postcssnested,
        autoprefixer({browsers: ['last 4 versions']}),
        mqpacker,
        csswring
    ];
    gulp.src('./css/*.css')
        .pipe(postcss(processors).on('error', function(e) {
          console.log(e.message);
        }))
        .pipe(gulp.dest('./app/css'))
        .pipe(livereload());
});

gulp.task('js', ['lint'], function() {
  browserify('./js/moment.min.js', { debug: true })
  .transform(babelify)
  .bundle()
  .on('error', util.log.bind(util, 'Browserify Error'))
  .pipe(source('moment.min.js'))
  .pipe(buffer())
  .pipe(uglify({ mangle: true }))
  .pipe(gulp.dest('./app/js'));

  browserify('./js/pwa.js', { debug: true })
  .transform(babelify)
  .bundle()
  .on('error', util.log.bind(util, 'Browserify Error'))
  .pipe(source('pwa.js'))
  .pipe(buffer())
  .pipe(uglify({ mangle: true }))
  .pipe(gulp.dest('./app/js'));
});

gulp.task('lint', function(){
    gulp.src('./js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('css/*.css', ['css']);
  gulp.watch('js/*.js', ['js']);
});