import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT): 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0

});

export async function testConnection(){
    try{
        const connection = await pool.getConnection();
        console.log(' La conexion a la base de datos Mysql ha sido establecida correctamente');

    }catch(error){
        console.error(' Error al conectar con la base de datos:', error.message);
        process.exit(1)
    }
}