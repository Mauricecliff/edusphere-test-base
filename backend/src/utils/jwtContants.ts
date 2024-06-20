import {config} from "dotenv"

config()

const secret=process.env.JWT_SECRET_KEY
const expiresIn=process.env.JWT_EXPIRES_AT||"3600s"
console.log({secret,expiresIn})
export default {secret,expiresIn}