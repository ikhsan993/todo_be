import mysql from "mysql2" 
import dotenv from "dotenv"

dotenv.config()

const {MYSQL_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DBNAME} = process.env
const db = mysql.createPool({
    host : MYSQL_HOST,
    user : MYSQL_USER,
    password : MYSQL_PASSWORD,
    database : MYSQL_DBNAME
})

export default db