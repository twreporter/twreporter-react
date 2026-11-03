#!/usr/bin/env bash
set -euo pipefail

project=coastal-run-106202
if [[ $# -ne 3 || "${1:-}" != --apply || "${2:-}" != *@* || "${2:-}" == -* ]]; then
  echo "Usage: bash $0 --apply YOUR_ACCOUNT_EMAIL {dev|staging|prod}"
  echo 'Creates secret resources and runtime access only; no secret values are read or written.'
  exit 1
fi
account="$2"
environment="$3"
case "$environment" in
  dev|staging) runtime_env=nonprod ;;
  prod) runtime_env=prod ;;
  *) echo 'Expected dev, staging or prod.' >&2; exit 1 ;;
esac
args=(--project="$project" --account="$account" --quiet)
runtime="sa-www-${runtime_env}-runtime@${project}.iam.gserviceaccount.com"
disabled="$(gcloud iam service-accounts describe "$runtime" "${args[@]}" --format='value(disabled)')"
[[ "$disabled" != True && "$disabled" != true ]] || { echo "Disabled SA: $runtime" >&2; exit 1; }
# A failed query is not evidence that a secret is absent.
existing="$(gcloud secrets list "${args[@]}" --format='value(name.basename())')"
secret="${environment}-twreporter-react_cookie-secret"
case $'\n'"$existing"$'\n' in
  *$'\n'"$secret"$'\n'*) echo "Exists, unchanged: $secret" ;;
  *)
    gcloud secrets create "$secret" "${args[@]}" --replication-policy=automatic \
      --labels="env=$environment,service=twreporter-react" --format=none
    ;;
esac
gcloud secrets add-iam-policy-binding "$secret" "${args[@]}" \
  --member="serviceAccount:$runtime" --role=roles/secretmanager.secretAccessor \
  --condition=None --format=none
echo "Runtime access configured: $secret"
echo 'Add the existing cookie secret as a version separately. Redeploy after rotation.'
