import { Router } from "express";
import { SignInSchema, SignUpSchema } from "../validators/index.js";
import { User } from "../db/index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

const generateToken = async (user) => {
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    throw new Error("Error creating token");
  }
};

router.post("/signup", async (req, res) => {
  const validator = SignUpSchema.safeParse(req.body);
  if (!validator.success) {
    return res.status(400).json(validator.error.flatten());
  }

  const { name, email, password } = validator.data;

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  const userObj = user.toObject();
  delete userObj.password;
  const token = await generateToken(userObj);

  return res.status(201).json({
    message: "User created successfully",
    user: userObj,
    accessToken: token,
  });
});

router.post("/signin", async (req, res) => {
  const validator = SignInSchema.safeParse(req.body);
  if (!validator.success) {
    return res.status(400).json(validator.error.flatten());
  }

  const { email, password } = validator.data;
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials!",
    });
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid credentials!",
    });
  }

  const userObj = user.toObject();
  delete userObj.password;
  const token = await generateToken(userObj);

  return res.json({
    message: "User signed in successfully",
    user: userObj,
    accessToken: token,
  });
});

export default router;
