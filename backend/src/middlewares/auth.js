import 'dotenv/config'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const userMiddleware = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers
  const authArr = authorization.split(' ')
  const decoded = jwt.verify(authArr[1], process.env.JWT_SECRET)

  if (decoded) {
    req.user = decoded
    return next()
  } else {
    res.status(401)
    throw new Error('Unauthorized')
  }
})

export default userMiddleware
