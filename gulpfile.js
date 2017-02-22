var async = require('async');
var spawn = require('child_process').spawn;
var git = require('gulp-git');
var gulp = require('gulp');

/**
 * Release Tasks
 */
gulp.task('publish:tag', function (done) {
  require('fs').readFile(__dirname + '/CHANGELOG.md', 'utf-8', function(err, changelogFile) {
    if (err) {
      throw err;
    }
    if (typeof changelogFile !== 'string') {
      throw new Error('Please check the content of CHANGELOG.md');
    }
    var match = changelogFile.match(/((?:\d+\.)(?:\d+\.)(?:\d+))/i);
    var pkg = match[0];

    var v = 'v' + pkg;
    var message = 'Release ' + v;

    git.tag(v, message, function (err) {
      if (err) throw err;
      git.push('origin', v, function (err) {
        if (err) throw err;
        done();
      });
    });
  });
});

gulp.task('publish:npm', function (done) {
	require('child_process')
		.spawn('npm', ['publish'], { stdio: 'inherit' })
		.on('close', done);
});

gulp.task('release', ['publish:tag']);
