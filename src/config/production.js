import dotenv from "dotenv"
dotenv.config()



export const production = {
    mongodb_connection_url: process.env.PROD_MONGODB_CONNECTION_URL,
    bcrypt_salt_round: +process.env.PROD_BCRYPT_SALT_ROUND,
    jwt_secret_key: process.env.PROD_JWT_SECRET,
    port: +process.env.PORT
}