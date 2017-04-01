var gulp = require('gulp');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var exec = require('child_process').exec;
var clean = require('gulp-clean');
var robocopy = require('robocopy');
var es         = require('event-stream');
var jeditor = require('gulp-json-editor');

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

gulp.task('cloneRelease', function(){
  git.clone('https://tanujaggarwal@github.com/Compro-Single-Step/SIMS-Builder.git',
            {args:'./checkout/qaRelease'}, function(err) {
    if (err) throw err;
  });
});

gulp.task('checkoutRelease', function(){
  git.checkout('SIM-Builder-Release', {cwd: './checkout/qaRelease'}, function (err) {
    if (err) throw err;
  });
});

var filesToMove = [
        '/dist',
        '/package.json'
    ];

gulp.task('move', function(){

  var distFolder = gulp.src('./checkout/develop/dist/**/*')
        .pipe(gulp.dest('./checkout/qaRelease/dist'));

  var packageJson = gulp.src('./checkout/develop/package.json')
      .pipe(jeditor(function(json) {
        json.scripts.start = "node server/server";
        return json; // must return JSON object. 
      }))
      .pipe(gulp.dest('./checkout/qaRelease/'));

  return es.concat(distFolder, packageJson);
});

gulp.task('add', function() {
  return gulp.src('./checkout/qaRelease/')
    .pipe(git.add());
});

gulp.task('commit', function() {

    return gulp.src('./checkout/qaRelease/')
      .pipe(git.commit("initial test"));

});

gulp.task('push', function(){
  git.push('https://tanujaggarwal@github.com/Compro-Single-Step/SIMS-Builder.git', 'SIM-Builder-Release', function (err) {
    if (err) throw err;
  });
});

gulp.task('gitsend', function() {
  runSequence('add', 'commit', 'push');
});

gulp.task('chdir', function(cb) {
    process.chdir('./checkout/develop');
    //process.chdir('path');
});

gulp.task('install', function(cb) {
    exec('npm install', {maxBuffer: 1024 * 500}, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('buildforDeploy', function(cb) {
    exec('npm run build', {maxBuffer: 1024 * 500}, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


gulp.task('build', function(callback) {
  runSequence(['chdir','install','buildforDeploy'],callback);
});