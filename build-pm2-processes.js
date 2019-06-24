const fs = require('fs')
const rb = process.env.RELEASE_BRANCH || 'master'

fs.writeFileSync('processes.json', JSON.stringify({
  apps: [ {
    name       : 'server',
    script      : 'dist/server.js',
    max_memory_restart: '1500M',
    merge_logs  : true,
    out_file    : 'pm2-server-out.log',
    error_file  : 'pm2-server-err.log',
    env         : {
      NODE_ENV: 'production',
      RELEASE_BRANCH: rb
    },
    node_args: '--max_old_space_size=2048'
  } ]
}))
