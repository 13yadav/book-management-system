import zod from "zod";

const SignUpSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
});

const SignInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});

const BookSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
});

export {
    SignUpSchema,
    SignInSchema,
    BookSchema,
};