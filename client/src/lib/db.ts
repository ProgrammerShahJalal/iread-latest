import mysql, { RowDataPacket } from 'mysql2/promise';

export async function query<T extends object>(sql: string, values: any[] = []): Promise<T[]> {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });

    const [results] = await connection.execute<(T & RowDataPacket)[]>(sql, values);
    await connection.end();
    return results;
}
