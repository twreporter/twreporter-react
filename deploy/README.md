# Cloud Run 部署

dev、staging、release 分支透過 Cloud Build 分別部署至 dev、staging、
production 的 Cloud Run service。release 部署須經人工核准。

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

## 流量

部署沿用服務既有的流量設定。若曾手動 rollback 或固定 revision，
後續部署不會自動將流量切至新 revision。

確認最新 revision 可以上線後，可恢復 100% 流量追蹤 latest：

```sh
gcloud run services update-traffic SERVICE \
  --project=coastal-run-106202 --region=asia-east1 --to-latest
```
