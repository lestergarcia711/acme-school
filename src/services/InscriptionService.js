import { pool} from '../config/database.js';
import { StudentRepository } from '../repositories/StudentRepository.js';
import { InscriptionRepository } from '../repositories/IncriptionRepository.js';


export class InscriptionService {
    constructor(){
        this.studentRepo = new StudentRepository();
        this.inscriptionRepo = new InscriptionRepository();

    }

    async enrollStudent({
        studentId, courseScheduleId
    }){
        const student = await this.studentRepo.findById(studentId);
        if (!student){
            throw new Error(`El estudiante con Id ${studentId} no existe`);
        }
        const existingEnrollment = await this.inscriptionRepo.findByStudentAndSchedule(
            studentId,
            courseScheduleId
        );

        if (existingEnrollment){
            throw new Error (`El estudiante ${student.getFullName()} ya esta inscrito en este curso u horario.`);
        }

        const connection = await pool.getConnection();

        try{
            await connection.beginTransaction();

            console.log('Transaccion iniciada: Guardando inscripcion...');

            const inscriptionId = await this.inscriptionRepo.save({
                studentId,
                courseScheduleId,
                registerDate: new Date()
            }, connection);

            await connection.commit();
            console.log('Transaccion completada exitosamente.');

            return{
                success: true,
                inscriptionId,
                message: ` Estudiante ${student.getFullName()} inscrito exitosamente.`
            };
        }catch(error){
            await connection.rollback();
            console.error('Error durante el proceso. Transaccion revertida.')
            throw new Error(`Fallo en la inscripcion: ${error.message}`);
        }finally{
            connection.release();
        }

    }
    async getEnrollmentReport(){
        return await this.inscriptionRepo.findDetailedInscriptions();
    }
}