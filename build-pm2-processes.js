const config = require('./config')
const fs = require('fs')

fs.writeFileSync('processes.json', JSON.stringify({
  apps: [{
    name       : 'server',
    script      : 'dist/server.js',
    max_memory_restart: '1500M',
    merge_logs  : true,
    out_file    : 'pm2-server-out.log',
    error_file  : 'pm2-server-err.log',
    env         : {
      NODE_ENV: 'production',
      RELEASE_BRANCH: process.env.RELEASE_BRANCH || 'master',
      API_HOST: config.API_HOST,
      API_PROTOCOL: config.API_PROTOCOL,
      API_PORT: config.API_PORT
    },
    node_args: '--max_old_space_size=2048'
  }]
}))
