const request = require('supertest')
const app = require('./app')

describe("App Tests", () => {
    test("GET /", async () => {
        const res = await request(app).get("/")

        expect(res.status).toBe(200)
        expect(res.body.info).toMatch("Gyeme API app")
    })

    test("GET /classes", async () => {
        const res = await request(app).get("/classes")

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
    })

    test("GET /users", async () => {
        const res = await request(app).get("/users")
        //const expected = ["James Smith"]

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
        //expect(res.body[0].username).toBe("James Smith")
    })

    test("GET /posts", async () => {
        const res = await request(app).get("/posts")

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
    })

    test("GET /comments", async () => {
        const res = await request(app).get("/comments")

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
    })

    test("GET /locations", async () => {
        const res = await request(app).get("/locations")

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
    })

    test("GET /trainers", async () => {
        const res = await request(app).get("/trainers")

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
    })

    test("POST /classes", async () => {
        const res = await request(app)
            .post("/classes")
            .send({
                name: "Test Entry",
                description: 'Test Entry',
                members_only: false,
                location_id: 1,
                trainer: null,
                image: ""
            })

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
        expect(res.body.id).toBeTruthy()
        expect(res.body.name).toBe('Test Entry')
    })

    test("POST /users", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                username: "Test Entry",
                email: 'test@entry.com',
                password: "password123",
                role_id: 1,
                location_id: 1,
                image: ""
            })

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
        expect(res.body.id).toBeTruthy()
        expect(res.body.username).toBe('Test Entry')
        expect(res.body.email).toBe('test@entry.com')
    })

    test("POST /posts", async () => {
        const res = await request(app)
            .post("/posts")
            .send({
                body: "Testing posts",
                user_id: 1,
                title: "Test Entry"
            })

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
        expect(res.body.id).toBeTruthy()
        expect(res.body.title).toBe('Test Entry')
        expect(res.body.user_id).toBe(1)
    })

    test("POST /comments", async () => {
        const res = await request(app)
            .post("/comments")
            .send({
                body: "This is a test comment",
                user_id: 1,
                post_id: 1
            })

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
        expect(res.body.id).toBeTruthy()
        expect(res.body.body).toBe('This is a test comment')
        expect(res.body.post_id).toBe(1)
    })

})