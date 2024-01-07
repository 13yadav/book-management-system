import "dotenv/config";
import { connect, Schema, model } from "mongoose";

connect(process.env.MONGODB_URL)
  .then((r) => console.log("Connected to Mongo DB"))
  .catch((err) => console.log("Error connecting to Mongo DB", err.message));

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  published: { type: Boolean, default: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const User = model("User", UserSchema);
const Book = model("Book", BookSchema);

export { User, Book };
