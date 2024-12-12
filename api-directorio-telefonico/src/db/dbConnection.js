import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql
    .createPool({
        host: 'localhost',
        user: 'root',
        password: 'parapente58',
        database: 'DirectorioTelefonico',
    })
    .promise();
