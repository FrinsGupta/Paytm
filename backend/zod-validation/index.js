const zod = require("zod")

const signupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email().endsWith("@gmail.com"),
    password: zod.string().min(5),
})

const signinSchema = zod.object({
    email: zod.string().email().endsWith("@gmail.com"),
    password: zod.string().min(5)
})

module.exports = {signupSchema, signinSchema}