import { testConnection, pool } from './config/database.js';
import { CLIApp } from './cli/menu.js';

async function main(){
    try{
         await testConnection();
         const app = new CLIApp();
         await app.start();
    }catch(error){
         console.error('Error critico al iniciar la aplicacion;', error.message);
         process.exitCode =1;
    }finally{
        await pool.end();
        console.log('Conexion a MySQL liberada.Proceso finalizado.');
    }
}

main();