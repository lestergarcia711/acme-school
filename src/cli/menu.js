import readline from 'readline/promises';
import {stdin as input, stdout as output} from 'process';
import { StudentRepository } from '../repositories/StudentRepository.js';
import { InscriptionService } from '../services/InscriptionService.js';

export class CLIApp{
    constructor(){
        this.studentRepo = new StudentRepository();
        this.inscriptionService = new InscriptionService();
        this.rl = null ;
    }

    async start(){
        this.rl = readline.createInterface({
            input, output
        });
        
        let running = true

        console.clear();
        console.log('=================================================');
        console.log('  BIENVENIDO A SISTEMA DE GESTION ACME SCHOOL!!  ');
        console.log('=================================================');
       
        while (running){
            this.showMainMenu();
            const option = await this.rl.question('\n->Elije una opcion (1-5):');
            
            switch(option.trim()){
                case '1':
                    await this.handleRegisterStudent();
                    break;
                case '2':
                    await this.handleListStudents();
                    break;
                case '3':
                    await this.handleEnrollStudent();
                    break;
                case '4':
                    await this.handleViewEnrollments();
                    break;
                case '0':
                    console.log('\n Saliendo del sistema... Hasta Pronto!\n');
                    running = false;
                    break;
                default:
                    console.log('\n Opcion invalida. Intenta nuevamente.');

            }
            if (running){
                await this.rl.question('\n=>Presiona enter para continuar.');
                console.clear();
            }
        }
        this.rl.close();
    }
            showMainMenu(){
                console.log('\n ==== MENU PRINCIPAL ====' );
                console.log('1.Registrar un nuevo estudiante.');
                console.log('2. Listar todos los estudiantes');
                console.log('3. Incribir estudiante a un curso/horario');
                console.log('4.Ver reporte de incripciones activas');
                console.log('0.Salir');
            }

            async handleRegisterStudent(){
                console.log('\n ---- REGISTRO DE NUEVO ESTUDIANTE ----');
                try{
                    const firstName = await this.rlquestion('Nombre:');
                    const lastName = await this.rlquestion('Apelido:');
                    const identificationTypeId = await this.rlquestion('Id/identificacion');
                    const identificationNumber = await this.rlquestion('Numero Identificacion:');
                    const gender = await this.rlquestion(' Genero Masculino/Femenino:');
                    const birthdate = await this.rlquestion('Fecha de nacimiento(YYY-MM-DD:');
                    const email = await this.rlquestion('Correo Electronico: ');
                    const address= await this.rlquestion('Direccion de Residencia:');
                    const cityId= await this.rlquestion('Id ciudad (ej.1)');

                    const code = `STU-${Date.now().toString().slice(-4)}`;

                    const newId = await this.studentRepo.save({
                        code,
                        firstName,
                        lastName,
                        identificationTypeId: Number(identificationTypeId),
                        identificationNumber,
                        gender,
                        birthdate,
                        email,
                        address,
                        cityId: Number(cityId)
                    });

                    console.log(`\n Estudiante guardado con exito con el codigo ${code} e id [${newId}]`);

                }catch(error){
                    console.log (`\n Error al registrar estudiante: ${error.message}`);

                }
            }

            async handleListStudents(){
                console.log('\n--- LISTADO DE ESTUDIANTES ---');
                try{
                 const students = await this.studentRepo.findAll();
                 if(students.length === 0){
                    console.log('No hay estudiantes registrados en la base de datos.');
                    return;
                 }

                 const formattedList = students.map(s => ({
                    ID: s.id,
                    Codigo: s.code,
                    'Nombre Completo': s.getFullName(),
                    Email: s.email
                 }));

                 console.table(formattedList);

                }catch(error){
                    console.log(`\n Error al listar estudiantes: ${error,message}`);
                    

                }
            }
            
            async handleEnrollStudent(){
                console.log('\n --- PROCESO DE MATRICULA E INSCRIPCION ---');
                try{
                    const studentId = await this.rlquestion('Ingrese el Id del estudiante:');
                    const courseScheduleId = await this.rlquestion(' Ingrese el Id de horario/oferta del curso:');

                    const result = await this.inscriptionService.enrollstudent({
                        studentId: Number(studentId),
                        coursescheduleId: Number(courseScheduleId)
                    });

                    console.log(`\n ${result.message}`);
                }catch(error){
                    console.error(`\n ${error.message}`);
                }
            }
          
            async handleViewEnrollments(){
                console.log('\n --- REPORTES DE INSCRIPCIONES ACTIVAS ---');
                try{
                    const enrollments= await this.inscriptionService.getEnrollmentReport();
                    if(enrollments.legth === 0){
                        console.log('No hay incripciones registradas.');
                        return;
                    }

                    console.table(enrollments);
                }catch(error){
                    console.log(`\nError al consultar reporte: ${error.message}`);
                }
            }
}