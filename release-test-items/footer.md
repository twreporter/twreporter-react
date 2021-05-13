# 測試 Footer

## 測試項目：

- [ ] 報導者 logo
  - [ ] 點了會到首頁
- [ ] 關於我們
  - [ ] 點了會到 https://www.twreporter.org/about-us
- [ ] 作者群
  - [ ] 點了會到 https://www.twreporter.org/authors
- [ ] 訂閱電子報
  - [ ] 點了會到 https://twreporter.us14.list-manage.com/subscribe/post?u=4da5a7d3b98dbc9fdad009e7e&id=e0eb0c8c32

## 「贊助我們」測試項目

- [ ] [首頁](https://www.twreporter.org/)：贊助連結是 https://support.twreporter.org/?utm_source=www.twreporter.org&utm_medium=footer&utm_campaign=%2F
- [ ] [專題列表頁](https://www.twreporter.org/topics)：贊助連結是 https://support.twreporter.org/?utm_source=www.twreporter.org&utm_medium=footer&utm_campaign=%2Ftopics
- [ ] [評論列表頁](https://www.twreporter.org/categories/reviews)：贊助連結是 https://support.twreporter.org/?utm_source=www.twreporter.org&utm_medium=footer&utm_campaign=%2Fcategories%2Freviews
- [ ] [攝影頁](https://www.twreporter.org/photography)：贊助連結是 https://support.twreporter.org/?utm_source=www.twreporter.org&utm_medium=footer&utm_campaign=%2Fphotography
- [ ] 經 client side re-render 後，贊助連結正確
  - 檢查步驟：
    1. 進入首頁，確認贊助連結為 https://support.twreporter.org/?utm_source=www.twreporter.org&utm_medium=footer&utm_campaign=%2F
    2. 點擊任一頁面進入，確認贊助連結為 https://support.twreporter.org/?utm_source=www.twreporter.org&utm_medium=footer&utm_campaign=%2F`${pathname}`
       例如：若專題列表頁(pathname: topics)，贊助連結為 https://support.twreporter.org/?utm_source=www.twreporter.org&utm_medium=footer&utm_campaign=%2Ftopics
