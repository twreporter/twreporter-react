var async = require('async');
var spawn = require('child_process').spawn;
var git = require('gulp-git');
var gulp = require('gulp');

/**
 * Build Tasks
 */
gulp.task('build-packages', function (done) {
  async.auto({
    buildJs: function(callback) {
      process.env.WEBPACK_CONFIG = __dirname + '/webpack/pkg.config.js';
      process.env.BABEL_DISABLE_CACHE = 1;
      process.env.BABEL_ENV = 'BUILDPKG';
      process.env.NODE_ENV = 'production';

      spawn('babel', ['--out-dir=dist', 'src'], {stdio: 'inherit'})
        .on('close', callback)
        .on('error', function(err) {
          callback(err);
        })
    },
    buildBootstrap:[ 'buildJs', function(callback) {
      spawn('webpack', ['--verbose', '--colors', '--display-error-details', '--config', __dirname + '/webpack/bootstrap.config.js'], {stdio: 'inherit'})
        .on('close', callback)
        .on('error', function(err) {
          callback(err);
        })
    }],
    buildCss: ['buildBootstrap', function(callback) {
      async.auto({
        createFolder: function(cb) {
          spawn('mkdir', ['-p', 'dist/styles'], {stdio: 'inherit'})
            .on('close', cb)
            .on('error', function(err) {
              cb(err);
            })
        },
        concatCss: [ 'createFolder', function(cb) {
          spawn('node', ['./concatCssFiles', __dirname], {stdio: 'inherit'})
            .on('close', cb)
            .on('error', function(err) {
              cb(err)
            })
        }],
        removeFolder: [ 'concatCss', function(cb) {
          spawn('rimraf', [ __dirname + '/lib-css' ], {stdio: 'inherit'})
            .on('close', cb)
            .on('error', function(err) {
              cb(err)
            })
        }]
      }, function(err, results) {
        if (err) {
          return callback(err)
        }
        callback()
      })
    }]
  }, function(err, results) {
    if (err) {
      console.log('build-packages process occurs err:', err)
    } else {
      console.log('build-packages process is done')
      done();
    }
  });
});

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
