export default {
  _items: [
    {
      relateds: [ ],
      _updated: "Thu, 01 Jan 1970 00:00:00 GMT",
      style: "article",
      byline: "",
      subtitle: "",
      name: "i-am-a-title",
      tags: [
        {
          _id: "tag-id-1",
          name: "tag-1",
          key: "tag-1",
          __v: 0
        }
      ],
      title: "我是title",
      publishedDate: "Thu, 28 Apr 2016 02:42:14 GMT",
      content: {},
      state: "published",
      og_description: "",
      _links: {
        self: {
          href: "posts/post-id-2",
          title: "post"
        }
      },
      writters: [
        {
          name: "Mika",
          twitter: "",
          instantgram: "",
          __v: 0,
          facebook: "",
          _id: "5723156a1cece3ae858dffe5",
          homepage: "",
          email: "mika@twreporter.org"
        },
        {
          _id: "5723157b1cece3ae858dffe6",
          email: "hc@twreporter.org",
          __v: 0,
          name: "HC"
        }
      ],
      photographers: [],
      designers: [],
      engineers:[],
      og_title: "",
      _id: "post-id-2",
      slug: "post-slug-2",
      categories: [
        {
          __v: 0,
          _id: "category-id-1",
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
      href: "posts?max_results=1&where={\"tags\":{\"$in\":[\"tag-id-1\"]}}",
      title: "posts"
    },
    parent: {
      href: "/",
      title: "home"
    },
    prev: {
      href: "posts?max_results=1&where={\"tags\":{\"$in\":[\"tag-id-1\"]}}&page=1",
      title: "prev page"
    }
  },
  _meta: {
    max_results: 1,
    total: 2,
    page: 2
  }
}

