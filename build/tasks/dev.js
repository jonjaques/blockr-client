import gulp                from 'gulp'
// import Server, { host, port } from '../webpack/dev-server'

gulp.task('dev', ['build-css'], ()=> {
  let watchers = [
    'assets/scss/**/*.scss'
  ];
  return gulp.watch(watchers, ['build-css'])
})

// gulp.task('dev-server', (done)=> {
//   let server = Server()
//   server.listen(port, host, function() {
//     console.info('Webpack development server listening on %s:%s', host, port)
//   })
//   done();
// })
