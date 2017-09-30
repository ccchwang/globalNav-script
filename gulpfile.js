var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var css2js = require("gulp-css2js");
var browserSync = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var del = require('del');


const handleError = function(err){
  console.error(err);
}


//RUN SERVER
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'docs'
    },
  })
})


//CSS
gulp.task('css', function(){
  return gulp.src('src/stylesheet/**/*.scss')
    .pipe(sass())
    .on('error', handleError)
    .pipe(autoprefixer({browsers: ['last 3 versions']}))
    .pipe(gulpif(global.production, cssnano({preset: 'default'})))
    .pipe(css2js({
      prefix: "export default function() { return `",
      suffix: "`}",
      splitOnNewline: false
  }))
    .pipe(gulp.dest('src/javascript'))
});


//HTML
gulp.task('html', function(){
  return gulp.src('src/*.html')
    .pipe(gulpif(global.production, htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('docs'))
    .pipe(browserSync.stream())
});


//JAVASCRIPT
gulp.task('javascript', function(){
  return gulp.src('src/javascript/index.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      },
      output: {
        filename: 'bundle.js',
      },
    }))
    .on('error', handleError)
    .pipe(gulpif(global.production, uglify()))
    .pipe(gulp.dest('docs/javascript'))
    .pipe(browserSync.stream())
});



//WATCH - DEVELOPMENT
gulp.task('watch', function(){
  runSequence('css', 'javascript',
    ['html', 'browserSync'],
    function() {
      gulp.watch('src/stylesheet/**/*.scss', ['css', 'javascript']);
      gulp.watch(['src/data/index.json', 'src/javascript/index.js'], ['javascript']);
      gulp.watch('src/*.html', ['html']);
    }
  )
})


//CLEAN - PRODUCTION
gulp.task('clean', function(){
  global.production = true;
  return del.sync('docs');
})


//BUILD - PRODUCTION
gulp.task('build', function(){
  runSequence('clean', 'css', 'javascript', 'html',
    function() {
      console.log('Finished building~!');
    }
  )
})




