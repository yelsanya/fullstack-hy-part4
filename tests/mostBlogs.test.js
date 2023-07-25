const listHelper = require('../utils/list_helper')

test("Most blogs by single author in no blogs", () => {
  const blogs = []

  const result = listHelper.mostBlogs(blogs)
  expect(result).toBe(null)
})

test("Most blogs by single author", () => {
    const blogs = [
        {
            "title":"first post",
            "author":"yelsanya",
            "url":"https://github.com/yelsanya/fullstack-hy-part4",
            "likes":1007
        },
        {
            "title":"second post",
            "author":"yelsanya",
            "url":"https://github.com/yelsanya/fullstack-hy-part3",
            "likes":330
        }
    ]

    const answer = {
        "author":"yelsanya",
        "blogs":2
    }

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(answer)
})