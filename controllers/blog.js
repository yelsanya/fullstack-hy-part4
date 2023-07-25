const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    if (!request.token) {
        return response.status(401).json({ error: "No token provided"})
    }
    if (!request.user) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user

    const blog = new Blog(request.body)

    if (!blog.url || !blog.title){

        response.status(400).end()
        return
    }
    if (!blog.likes){
        blog.likes = 0
    }

    blog.user = user.id
    savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id

    if (!request.token) {
        return response.status(401).json({ error: "No token provided"})
    }
    if (!request.user) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user

    const blog = await Blog.findById(id).catch(error => next(error))

    if (!blog) return

    if (blog.user.toString() === user.id.toString()){
        const res = await Blog.findByIdAndDelete(id).catch(eror => next(error))

        if (!res) return

        response.status(204).end()
    }
    else {
        response.status(403).end()
    }
})

blogRouter.put("/:id", async (request, response, next) => {
    const id = request.params.id

    const data = request.body

    const res = await Blog.findByIdAndUpdate(id, data, {new: true}).catch(error => next(error))
    if (res) response.json(data)
})

module.exports = blogRouter