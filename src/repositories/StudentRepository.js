import { pool } from '../config/database';
import { Student } from '../models/Student.js';

export class StudentRepository{

    #mapToEntity(row){
        return new Student({
            id: row.id,
            code: row.code,
            firstName: row.firstName,
            lastName: row.lastName,
            identificationTypeId: row.identification_type_id,
            identificationNumber: row.identificationNumber,
            gender: row.gender,
            birthdate: row.birthdate,
            email: row.email,
            address: row.address,
            cityId: row.city_id
        });
    }
    async findAll(){
        const query = 'SELECT * FROM students';
        const [rows]= await pool.query(query);
        return rows.map(row => this.#mapToEntity(row));
    }
    async findById(id){
        const query = 'SELECT * FROM students WHERE id = ?';
        const [rows]= await pool.query(query, [id]);
        
        if (rows.length === 0) return null;
        return this.#mapToEntity(rows[0]);
    }

    async save(studentData){
        const query = `INSERT INTO students
        (code, firstName, lastName, identification_type_id, identificationNumber,
        gender, birthdate, email, address, city_id)
        VALUES(?, ? , ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            studentData.code,
            studentData.lastName,
            studentData.identificationTypeId,
            studentData.identificationNumber,
            studentData.gender,
            studentData.birthdate,
            studentData.email,
            studentData.address,
            studentData.cityId
        ];

        const [results] = await pool.execute(query,params);
        return result.insertId;
    }


}