// dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const del = require('del');

// spinup frontend server and browserSync
gulp.task('server', function server() {
  browserSync.init({
    proxy: 'localhost:3000',
    open: false
  });
});

// cleanup the build directory e.g. rm -rf
gulp.task('clean:build', function clean() {
  return del.sync(['./build/**']);
});

/**
 * copy files to build locations
 **/
gulp.task('copy:fonts', function copyFonts() {
  var dest = './build/fonts';

  gulp.src('../node_modules/font-awesome/fonts/**')
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
  gulp.src('../node_modules/bootstrap/fonts/**')
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});

gulp.task('copy:index', function copyIndex() {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('copy:css', function copyCSS() {
  var dest = './build/css';

  gulp.src('./src/css/**/*.css')
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
  gulp.src('../node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
  gulp.src('../node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
  gulp.src('../node_modules/bootstrap/dist/css/bootstrap.min.css.map')
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});

gulp.task('copy:images', function copyImages() {
  var dest = './build/images';

  gulp.src('./src/images/**')
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});
/**
 * End copy section
 **/

// transpile js
gulp.task('browserify', function browserifyTask() {
  browserify({
    debug: true,
    entries: 'entry.js',
    extensions: ['.js', '.jsx'],
    basedir: './src/js',
    transform: [ babelify ]
  })
    .bundle()
    .on('error', function error(err) {
      console.error(err.filename);
      console.error(err.loc);
      console.error(err.codeFrame);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

// compile sass files
gulp.task('sass', function sassTask() {
  gulp.src('./src/sass/main.scss')
    .on('error', function error(err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(sass())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

gulp.task('build', ['copy:index', 'copy:css', 'copy:fonts', 'copy:images', 'browserify', 'sass']);

gulp.task('watch', ['build'], function watch() {
  gulp.watch(['./src/index.html'], ['copy:index']);
  gulp.watch(['./src/sass/base/base/fonts/**'], ['copy:fonts']);
  gulp.watch(['./src/css/**/*.css'], ['copy:css']);
  gulp.watch(['./src/sass/**/*.scss'], ['sass']);
  gulp.watch(['./src/js/**/*.js?(x)'], ['browserify']);
});

gulp.task('default', ['clean:build', 'server', 'watch']);
