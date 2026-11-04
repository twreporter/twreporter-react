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

每個 instance 包含 nginx（入口 8080）與 React（3000）；nginx 等待 React 的
`/check` startup probe 通過後啟動，再透過自己的 `/check` 驗證代理連通性。
public env 與 cookie secret 只注入 React。

路由設定在 [nginx/nginx.conf](nginx/nginx.conf)，移植自
`nginx-configs/twreporter-nginx-v2/nginx.conf.template` 的主網站規則。
一般請求透過 localhost 送至 React，專題與媒體請求依既有規則送至 GCS／GitHub Pages。
nginx 使用獨立 build context，不包含在 React image。

兩個 images 共用分支、commit SHA、build ID tag，在同一 revision 發布；回退 revision
會一併回退兩個 containers。nginx 額外使用 1 vCPU／256 MiB，React 維持 1 vCPU／1 GiB，
應於 staging 觀察資源用量後調整。既有單容器服務的首次轉換由維護者手動處理，
確認 container 名稱為 `nginx`、`react`，且只有 nginx 宣告 ingress port 8080，React 不宣告 container port；
Cloud Build 只更新這兩個 containers，不自動刪除其他 containers。

nginx 不再提供本機 cache 或 purge，快取由 Cloudflare 管理；保留既有回應快取標頭。
`/PURGE/*`、`/nginx_status`、`/_CHECK_` 改為 404，外部工具須移除對這些維運端點的依賴；
健康檢查統一使用 `/check`。TLS 由平台處理，nginx 不掛載憑證。

## 流量

部署沿用服務既有的流量設定。若曾手動 rollback 或固定 revision，
後續部署不會自動將流量切至新 revision。

確認最新 revision 可以上線後，可恢復 100% 流量追蹤 latest：

```sh
gcloud run services update-traffic SERVICE \
  --project=coastal-run-106202 --region=asia-east1 --to-latest
```
