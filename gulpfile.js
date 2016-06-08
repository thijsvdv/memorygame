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
    // rename = require('gulp-rename'),
    util = require('gulp-util'),
    // del = require('del'),
    babelify = require('babelify');



gulp.task('css', function () {
    var processors = [
        // autoprefixer({browsers: ['last 1 version']}),
        postcssnested,
        autoprefixer({browsers: ['last 4 versions']}),
        mqpacker,
        csswring
    ];
    gulp.src('./resources/assets/css/*.css')
        // .pipe(sourcemaps.init())
        .pipe(postcss(processors).on('error', function(e) {
          console.log(e.message);
          // console.log(e);
        }))
        // .on('error', notify.onError(function(error) { return 'Error: ' + error.message; }))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

// gulp.task('js', function () {
//     return gulp.src('./resources/assets/js/*.js')
//       // .pipe(babel())
//       // .pipe(babel().on('error', function(e) {
//       //   console.log('Error on line ' + e.lineNumber + " : " + e.message);
//       // }))
//       .pipe(uglify().on('error', function(e) {
//         console.log('Error on line ' + e.lineNumber + " : " + e.message);
//       }))
//       .pipe(gulp.dest('./public/js'));
// });

gulp.task('js', ['lint'], function() {
  browserify('./resources/assets/js/main.js', { debug: true })
  // .add(require.resolve('babel/polyfill'))
  .transform(babelify)
  .bundle()
  .on('error', util.log.bind(util, 'Browserify Error'))
  .pipe(source('main.js'))
  .pipe(buffer())
  // .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify({ mangle: true }))
  // .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./public/js'));

  browserify('./resources/assets/js/general.js', { debug: true })
  .transform(babelify)
  .bundle()
  .on('error', util.log.bind(util, 'Browserify Error'))
  .pipe(source('general.js'))
  .pipe(buffer())
  // .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify({ mangle: true }))
  // .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./public/js'));

  browserify('./resources/assets/js/moment.min.js', { debug: true })
  .transform(babelify)
  .bundle()
  .on('error', util.log.bind(util, 'Browserify Error'))
  .pipe(source('moment.min.js'))
  .pipe(buffer())
  // .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify({ mangle: true }))
  // .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./public/js'));

  browserify('./resources/assets/js/pwa.js', { debug: true })
  .transform(babelify)
  .bundle()
  .on('error', util.log.bind(util, 'Browserify Error'))
  .pipe(source('pwa.js'))
  .pipe(buffer())
  .pipe(uglify({ mangle: true }))
  .pipe(gulp.dest('./public/webapp/js'));
});

gulp.task('lint', function(){
    gulp.src('./resources/assets/js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
});


gulp.task("copyfiles", function() {
  gulp.src("vendor/bower_dl/jquery/dist/jquery.min.js")
    .pipe(gulp.dest("public/js/"));
});

function notify(event) {
  console.log('Reloading...');
  livereload.reload();
}

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('resources/views/*.php', notify);
  gulp.watch('resources/views/*/*.php', notify);
  gulp.watch('resources/assets/css/*.css', ['css']);
  gulp.watch('resources/assets/js/*.js', ['js']);
});