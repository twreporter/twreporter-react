# Cookie secret

`COOKIE_SECRET` 由 Secret Manager 注入，secret 名稱為
`<Cloud Run service 名稱>_cookie-secret`。

沿用各環境既有的 cookie secret，並維持與會員網站的簽章相容性。

## 建立與授權

先由 [twreporter/gcp-infrastructure](https://github.com/twreporter/gcp-infrastructure)
建立 runtime service account，再執行：

```sh
bash deploy/secrets/create-secrets.sh --apply YOUR_ACCOUNT_EMAIL ENV
```

`ENV` 為部署環境。腳本會建立缺少的 secret 並授予 runtime service account
存取權，不讀寫 secret 值。執行後，須另行將既有 cookie secret
加入 Secret Manager version，才能部署。

## 輪替

部署引用 secret 的 `latest` version，在 instance 啟動時載入。
新增 secret version 後，須重新部署以更新 instances，並協調會員網站，
維持 cookie 簽章相容性。

回退 Cloud Run revision 不會回退 secret version。
