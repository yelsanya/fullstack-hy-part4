const listHelper = require('../utils/list_helper')

test("Favourite blog among no blogs", () => {
  const blogs = []

  const result = listHelper.favouriteBlog(blogs)
  expect(result).toBe(null)
})

test("Favourite blog", () => {
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
        "title":"first post",
        "author":"yelsanya",
        "likes":1007
    }

    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual(answer)
})