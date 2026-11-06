#!/bin/bash
set -eu

react_pid=""
nginx_pid=""

shutdown() {
  trap '' TERM INT

  # nginx bounds draining with worker_shutdown_timeout; keep React available.
  if [[ -n "$nginx_pid" ]]; then
    kill -QUIT "$nginx_pid" 2>/dev/null || true
    wait "$nginx_pid" 2>/dev/null || true
  fi
  if [[ -n "$react_pid" ]]; then
    kill -TERM "$react_pid" 2>/dev/null || true
    wait "$react_pid" 2>/dev/null || true
  fi
}

trap shutdown EXIT
trap 'exit 0' TERM INT

nginx -t
# Cloud Run injects PORT=8080 for nginx; override it only for React.
PORT=3000 node dist/server.js &
react_pid=$!
env -u COOKIE_SECRET nginx -g 'daemon off;' &
nginx_pid=$!

# Any unexpected child exit, including status 0, makes the container fail.
wait -n "$react_pid" "$nginx_pid" || true
echo "Website process exited unexpectedly; stopping container." >&2
exit 1
