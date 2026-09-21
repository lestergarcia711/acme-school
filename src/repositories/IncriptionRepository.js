import { pool } from '../config/database.js';

export class InscriptionRepository{

    async save (data = {}, connection = null){
        const {courseScheduleId, studentId, registerDate = new Date()} = data;


        const executor = connection || pool;
        const query = `
        INSERT INTO inscriptions (course_schedule_id, student_id, register_date, active)
        VALUES(?, ?, ?, 1)`;

        const params = [courseScheduleId, studentId, registerDate];

        try{
             const [result] = await connection.execute(query, params);
        return result.insertId
        }catch(error){
            throw new Error(`Error en InscriptionRepository.save: ${error.message}`)
        }
       
    }
    async findByStudentAndSchedule( studentId, courseScheduleId){
        try{
          const query = `
            SELECT * FROM inscriptions
            WHERE student_id = ? AND course_schedule_id = ? AND active =1`;
            const [rows] = await pool.query(query, [studentId, courseScheduleId]);

            if (!rows || rows.length === 0) return null;
            return rows[0];
        }catch(error){
            throw new Error(`Error en InscriptionRepository.findByStudentAndSchedule: ${error.message}`)
        }
    }

    async findDetailedInscriptions(){
        try{
             const query = `
        SELECT
         i.id AS inscription_id,
         CONCAT(s.firstName, ' ', s.lastName) AS student_name,
         c.description AS  course_name,
         CONCAT(t.firstName, ' ', t.lastName) AS teacher_name,
         cl.code AS classroom,
         i.register_date
        FROM inscriptions i
        INNER JOIN students s ON i.student_id = s.id
        INNER JOIN courses_schedules cs ON i.course_schedule_id = cs.id
        INNER JOIN teachers t ON cs.teacher_id = t.id
        INNER JOIN classrooms cl ON  cs.classroom_id = cl.id
        WHERE i.active = 1
        `;

        const [rows] = await pool.query(query);
        return rows;
        }catch(error){
            throw new Error(`Error en InscriptionRepository.findDetailedInscriptions: ${error.message}`);
        }
       
        

    }


}