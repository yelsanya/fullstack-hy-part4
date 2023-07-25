const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Title",
    author: "Author",
    url: "https://www.example.org",
    likes: 0
  },
  {
    title: "Title 2",
    author: "Author 2",
    url: "https://www.example.org",
    likes: 100
  },
]

const userCreds = {
  username: "root",
  password: "sekret"
}

let token = ""

before(async () => {
  await api.post('/api/login').send(userCreds)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async() =>{
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () =>
{
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain("Title 2")
})

test('check if blogs have id', async () =>{
  const response = await api.get('/api/blogs')

  for (let i = 0 ; i < response.body.length; i++){
    expect(response.body[i].id).toBeDefined()
  }
})

test('check adding blog without token', async () => {
  const blog = {
    title: "Title",
    author: "Author",
    url: "https://www.example.org",
    likes: 1337
  }

  const response = await api.post('/api/blogs').send(blog)

  expect(response.status).toBe(401)
})

test("check adding blog", async () => {
  const blog = {
    title: "Title",
    author: "Author",
    url: "https://www.example.org",
    likes: 1337
  }

  const user = await api.post('/api/login').send(userCreds)

  await api.post("/api/blogs").set({Authorization: `Bearer ${user.body.token}`}).send(blog)

  const response = await api.get("/api/blogs")

  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('check blog without likes parameter', async () => {
  const blog = {
    title: "Title",
    author: "Author",
    url: "https://www.example.org"
  }
  const response = await api.post('/api/blogs').send(blog)

  expect(response.body.likes).toBe(0)
})

test('check blog without title parameter', async () => {
  const blog = {
    author: "Author",
    url: "https://www.example.org",
    likes: 1337
  }
  const response = await api.post('/api/blogs').send(blog)

  expect(response.status).toBe(400)
})

test('check blog without url parameter', async () => {
  const blog = {
    title: "Title 3",
    author: "Author 3",
    likes: 1337
  }
  const response = await api.post('/api/blogs').send(blog)

  expect(response.status).toBe(400)
})

test("check blog delete", async () => {
  const blogs = await api.get("/api/blogs")

  const id = blogs.body[0].id

  const response = await api.delete(`/api/blogs/${id}`)

  const newBlogs = await api.get("/api/blogs")

  expect(newBlogs.body).toHaveLength(1)
}, 100000)

test("check blog update", async () => {
  const blogs = await api.get("/api/blogs")

  const id = blogs.body[0].id

  const updatedBlog = {
    title: "Title 1337",
    author: "Author 1337",
    url: "https://www.example.org",
    likes: 228
  }

  const response = await api.put(`/api/blogs/${id}`).send(updatedBlog)

  expect(response.body).toEqual(updatedBlog)
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
})