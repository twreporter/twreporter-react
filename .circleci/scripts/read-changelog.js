require('fs').readFile(__dirname + '/../../CHANGELOG.md', 'utf-8', function(err, changelogFile) {
  if (err) {
    throw err;
  }
  if (typeof changelogFile !== 'string') {
    throw new Error('Please check the content of CHANGELOG.md');
  }
  var match = changelogFile.match(/((?:\d+\.)(?:\d+\.)(?:\d+))/i);
  var pkg = match[0];

  console.log(pkg)
});
