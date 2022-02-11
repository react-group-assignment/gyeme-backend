const request = require('supertest')
const app = require('./app')

describe("App Tests", () => {
    test("GET /", async () => {
        const res = await request(app).get("/")

        expect(res.status).toBe(200)
        expect(res.body.info).toMatch("Gyeme API app")
    })

    // test("POST /classes", async () => {
    //     const res = await request(app)
    //         .post("/classes")
    //         .send({
    //             name: 'Resistance',
    //             description: "Weight class",
    //             member_only: true,
    //             location_id: 1
    //         })
    // })

    test("GET /classes", async () => {
        const res = await request(app).get("/classes")
        const expected = [/yoga/i]

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
        expect(res.body.length).toBe(1)
        res.body.forEach((c, index) => {
            expect(c.name).toMatch(expected[index])
        })
    })

    test("GET /users", async () => {
        const res = await request(app).get("/users")
        const expected = ["James Smith"]

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i)
        expect(res.body[0].username).toBe("James Smith")
    })

    

})