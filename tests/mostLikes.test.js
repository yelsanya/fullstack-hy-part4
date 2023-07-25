const listHelper = require('../utils/list_helper')

test("Most likes in no blogs", () => {
  const blogs = []

  const result = listHelper.mostLikes(blogs)
  expect(result).toBe(null)
})

test("Most likes in blogs", () => {
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
        "likes":1337
    }

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(answer)
})