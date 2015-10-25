import gulp                from 'gulp'
import path                from 'path'
import sass                from 'gulp-sass'
import sourcemaps          from 'gulp-sourcemaps'
import autoprefixer        from 'gulp-autoprefixer'

gulp.task('build', ['build-css'])

const libPaths = {
  bootstrap: path.resolve(require.resolve('bootstrap'), '../../../scss')
}

gulp.task('build-css', ()=> {
  const sassOpts = {
    includePaths: [
      libPaths.bootstrap
    ]
  }

  return gulp.src('./assets/scss/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass(sassOpts).on('error', sass.logError))
      .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/css'))
})
