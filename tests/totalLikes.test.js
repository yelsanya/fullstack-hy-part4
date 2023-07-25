const listHelper = require('../utils/list_helper')

test("Total likes in no blogs", () => {
  const blogs = []

  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(0)
})

test("Total likes in blogs", () => {
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

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(1337)
})