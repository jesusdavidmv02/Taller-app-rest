import mysql from 'mysql2/promise';
import db from './config';

export const getPoolConnection = () => {
    const connection  = mysql.createPool({
        host: db.HOST,
        port : db.PORT,
        user : db.USER,
        password : db.PASSWORD,
        database : db.DB
    });
    return connection
}
