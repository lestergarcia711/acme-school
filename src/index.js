import { testConnection, pool } from './config/database.js';
import { buildContainer } from './container.js';
import { CLIApp } from './cli/menu.js';

async function main(){
    try{
         await testConnection();
         const container = buildContainer(pool);
         const app = new CLIApp(container);
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