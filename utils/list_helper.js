const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes += blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((favourite, blog) => {
    if (favourite === null || blog.likes > favourite.likes){
      favourite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
      return favourite
    }
    else {
      return favourite
    }
  }, null)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  let authors = {}
  let mostBlogsAuthor = ""
  let mostBlogsCount = 0
  for (let i = 0; i < blogs.length; i++){
    if (authors[blogs[i].author]){
      authors[blogs[i].author] += 1
    }
    else {
      authors[blogs[i].author] = 1
    }
    if (authors[blogs[i].author] > mostBlogsCount){
      mostBlogsAuthor = blogs[i].author
      mostBlogsCount = authors[blogs[i].author]
    }
  }
  return {
    author: mostBlogsAuthor,
    blogs: mostBlogsCount
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  let authors = {}
  let mostLikesAuthor = ""
  let mostLikesCount = 0
  for (let i = 0; i < blogs.length; i++){
    if (authors[blogs[i].author]){
      authors[blogs[i].author] += blogs[i].likes
    }
    else {
      authors[blogs[i].author] = blogs[i].likes
    }
    if (authors[blogs[i].author] > mostLikesCount){
      mostLikesAuthor = blogs[i].author
      mostLikesCount = authors[blogs[i].author]
    }
  }
  return {
    author: mostLikesAuthor,
    likes: mostLikesCount
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}