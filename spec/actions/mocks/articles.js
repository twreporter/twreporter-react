export default {
  _items: [
    {
      relateds: [ ],
      _updated: "Thu, 01 Jan 1970 00:00:00 GMT",
      style: "article",
      byline: "",
      subtitle: "",
      name: "test page",
      tags: [
        {
          _id: "572315331cece3ae858dffe3",
          name: "tag-1",
          key: "tag-1",
          __v: 0
        }
      ],
      title: "測試文章",
      publishedDate: "Fri, 29 Apr 2016 08:05:25 GMT",
      content: {},
      state: "published",
      og_description: "",
      _links: {
        self: {
          href: "posts/572315c51cece3ae858dffe7",
          title: "post"
        }
      },
      authors: [
        {
          _id: "5723157b1cece3ae858dffe6",
          email: "hc@twreporter.org",
          __v: 0,
          name: "HC"
        }
      ],
      og_title: "",
      _id: "572315c51cece3ae858dffe7",
      slug: "i-am-a-slug",
      categories: [
        {
          __v: 0,
          _id: "572303491cece3ae858dffe2",
          sortOrder: 1,
          key: "category-1",
          name: "category-1"
        }
      ],
      _created: "Thu, 01 Jan 1970 00:00:00 GMT"
    }
  ],
  _links: {
    self: {
      href: "posts?max_results=1&where={\"tags\":{\"$in\":[\"572315331cece3ae858dffe3\"]}}",
      title: "posts"
    },
    last: {
      href: "posts?max_results=1&where={\"tags\":{\"$in\":[\"572315331cece3ae858dffe3\"]}}&page=2",
      title: "last page"
    },
    parent: {
      href: "/",
      title: "home"
    },
    next: {
      href: "posts?max_results=1&where={\"tags\":{\"$in\":[\"572315331cece3ae858dffe3\"]}}&page=2",
      title: "next page"
    }
  },
  _meta: {
    max_results: 1,
    total: 2,
    page: 1
  }
}
