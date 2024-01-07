import "dotenv/config";
import jwt from "jsonwebtoken";

async function userMiddleware(req, res, next) {
  try {
    const { authorization } = req.headers;
    const authArr = authorization.split(" ");
    const decoded = jwt.verify(authArr[1], process.env.JWT_SECRET);

    if (decoded) {
      req.user = decoded;
      return next();
    } else {
      throw new Error();
    }
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error,
    });
  }
}

export default userMiddleware;
