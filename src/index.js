import { testConnection, pool } from './config/database.js';
import { CLIApp } from './cli/menu.js';

async function main(){
    try{
         await testConnection();
         const app = new CLIApp();
         await app.start();

    }catch(error){
        console.error('Error  critico al iniciar la aplicacion:', error.message);

    }finally{
        await pool.end();
        console.log('Conexion a MYSQL liberada. Proceso finalizado.');
        process.exit(0);
    }
}

main();