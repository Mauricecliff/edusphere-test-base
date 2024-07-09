import {config} from "dotenv"

config()

const secret=process.env.JWT_SECRET_KEY
const expiresIn=process.env.JWT_EXPIRES_AT||"3600s"
console.log({secret,expiresIn})

const REDIS_PORT=Number(process.env.REDIS_PORT)
const REDIS_HOST=process.env.REDIS_HOST
const REDIS_USER=process.env.REDIS_USER
const REDIS_PASS=process.env.REDIS_PASS
console.log(REDIS_HOST,REDIS_PORT,REDIS_USER,REDIS_PASS)
export {secret,expiresIn,REDIS_PORT,REDIS_HOST,REDIS_USER,REDIS_PASS}