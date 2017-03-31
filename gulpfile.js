var gulp = require('gulp');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');


gulp.task('clean', function () {
    return gulp.src('checkout', {read: false})
        .pipe(clean());
});

gulp.task('clone', function(){
  git.clone('https://tanujaggarwal@github.com/Compro-Single-Step/SIMS-Builder.git',
            {args:'./checkout/develop'}, function(err) {
    if (err) throw err;
  });
});

gulp.task('checkoutDevelop', function(){
  git.checkout('SIMPlayer_Preview', {cwd: './checkout/develop'}, function (err) {
    if (err) throw err;
  });
});

gulp.task('build')