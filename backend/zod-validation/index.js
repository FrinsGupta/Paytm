const zod = require("zod")

const singupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email().endsWith("@gmail.com"),
    password: zod.string().min(5),
})

const signinSchema = zod.object({
    email: zod.string().email().endsWith("@gmail.com"),
    password: zod.string().min(5)
})

module.exports = {singupSchema, signinSchema}