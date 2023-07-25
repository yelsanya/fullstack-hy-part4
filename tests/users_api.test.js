const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

//...

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({
        username: 'root',
        name:"root",
        passwordHash: passwordHash
    })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await api.get("/api/users")

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get("/api/users")
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)

    const usernames = usersAtEnd.body.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 100000)

  test("Create user with short username", async () =>{
    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)

    expect(response.status).toBe(400)
  })

  test("Create user with short password", async () =>{
    const newUser = {
      username: 'mattiiluu',
      name: 'Matti Luukkainen',
      password: 'sa',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)

    expect(response.status).toBe(400)
  })

  test("Create user with same username", async () => {
    const newUser = {
      username: "root",
      name: "some name",
      password: "sup3rs3cr3t"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)

    expect(response.status).toBe(400)
  })
})