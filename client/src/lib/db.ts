import mysql from 'mysql2/promise';

export async function query(sql: string, values = []) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });

    const [results] = await connection.execute(sql, values);
    connection.end();
    return results;
}
