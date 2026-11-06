# Cloud Run 部署

dev、staging、release 分支透過 Cloud Build 分別部署至 dev、staging、
production 的 Cloud Run service。release 部署須經人工核准。
release 的建置與 runtime 仍使用 `RELEASE_BRANCH=release`，部署環境名稱為 `prod`。

建置與部署設定見 [cloudbuild.yaml](../cloudbuild.yaml)。

Service accounts、IAM 與 push triggers 由
[twreporter/gcp-infrastructure](https://github.com/twreporter/gcp-infrastructure)
管理；cookie secret 的建立與授權見
[secrets/README.md](secrets/README.md)。

## 環境

Project：`coastal-run-106202`，region：`asia-east1`。

| 分支    | Cloud Run service        |
| ------- | ------------------------ |
| dev     | dev-twreporter-react     |
| staging | staging-twreporter-react |
| release | prod-twreporter-react    |

## 容器與路由

每個 instance 使用一個 `web` container，nginx（入口 8080）與 React（3000）
共用 1 vCPU／1280 MiB。image 設定見 [cloud-run/Dockerfile](cloud-run/Dockerfile)，
啟動流程見 [cloud-run/start.sh](cloud-run/start.sh)。應用設定與 `COOKIE_SECRET` 由 Cloud Run 提供。

路由設定在 [nginx/nginx.conf](nginx/nginx.conf)。一般請求透過 localhost 送至 React，
專題與媒體請求依規則送至 GCS／GitHub Pages。startup probe 使用 `/check`，確認 nginx 到 React 的連通性。

Cloud Build 建置、推送一個 image，使用分支、commit SHA、build ID 組成 tag；
nginx 與 React 在同一個 revision 發布，rollback 時也會一起回復。

快取由 Cloudflare 管理，nginx 不提供本機 cache 或 purge，但保留對外回應的快取標頭。
`/PURGE/*`、`/nginx_status`、`/_CHECK_` 回應 404。TLS 由平台處理，nginx 不掛載憑證。

## 流量

部署沿用服務既有的流量設定。若曾手動 rollback 或固定 revision，
後續部署不會自動將流量切至新 revision。

確認最新 revision 可以上線後，可恢復 100% 流量追蹤 latest：

```sh
gcloud run services update-traffic SERVICE \
  --project=coastal-run-106202 --region=asia-east1 --to-latest
```
