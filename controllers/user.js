const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  if (!request.body.username || !request.body.password || request.body.username.length < 3 || request.body.password.length < 3) {
    response.status(400).send({error: "username and password should be at least 3 chars"})
    return
  }
  const sameName = await User.find({username: request.body.username})

  if (sameName.length > 0) {
    response.status(400).send({error: "username already exists"})
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash: passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const usersRaw = await User.find({}).populate("blogs", {url: 1, title: 1, author: 1, id: 1})

  const users = usersRaw.map( user => {
    return {
      username: user.username,
      name: user.name,
      id: user.id,
      blogs: user.blogs
    }
  })

  response.json(users)
})

module.exports = usersRouter