const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const WORKERS = process.env.WORKERS
const LOG_LEVEL = process.env.LOG_LEVEL
const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  PORT,
  MONGODB_URI,
  WORKERS,
  LOG_LEVEL,
  JWT_LIFE_TIME,
  JWT_SECRET
}
