import gulp                from 'gulp'
import path                from 'path'
import sass                from 'gulp-sass'
import sourcemaps          from 'gulp-sourcemaps'
import autoprefixer        from 'gulp-autoprefixer'
import gzip                from 'gulp-gzip'
import s3                  from 'gulp-s3'


gulp.task('build', ['build-css'])
gulp.task('build-prod', ['build-assets'])

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

gulp.task('build-assets', ['build-css'], ()=> {
  let aws = {
    key     : process.env.S3_ACCESS_KEY,
    secret  : process.env.S3_SECRET_KEY,
    bucket  : process.env.S3_ASSETS_BUCKET,
    region  : process.env.S3_REGION
  }
  return gulp.src('./assets/**')
    .pipe(gzip())
    .pipe(s3(aws))
})