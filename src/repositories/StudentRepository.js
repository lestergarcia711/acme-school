import { pool } from '../config/database.js';
import { Student } from '../models/Student.js';

export class StudentRepository{

    #mapToEntity(row){
        if(!row)return null;
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
        try{
            const query = 'SELECT * FROM students';
        const [rows]= await pool.query(query);
        return rows.map(row => this.#mapToEntity(row));
        }catch(error){
            throw new Error(`Error al obtener estudiantes: ${error.message}`);
        }
    }

    async findById(id){
        try {
            const query = 'SELECT * FROM students WHERE id = ?';
        const [rows]= await pool.query(query, [id]);
        
        if (rows.length === 0) return null;
        return this.#mapToEntity(rows[0]);
        }catch(error){
            throw new Error(`Error al buscar estudiante por ID $i{id}: ${error.message}`);

        }
    }

    async save(studentData){
     try{
           const query = 
        `INSERT INTO students
        (code, firstName, lastName, identification_type_id, identificationNumber,
        gender, birthdate, email, address, city_id)
        VALUES(?, ? , ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            studentData.code ?? null,
            studentData.firstName ?? null,
            studentData.lastName ?? null,
            studentData.identificationTypeId ?? studentData.identification_type_id ?? null,
            studentData.identificationNumber ?? null,
            studentData.gender ?? null,
            studentData.birthdate ?? null,
            studentData.email ?? null,
            studentData.address ?? null,
            studentData.cityId ?? studentData.city_id ?? null
        ];

        const [result] = await pool.execute(query,params);
        return result.insertId;
     }catch(error){
        throw new Error(`Error al guardar el estudiante: ${error.message}`);
     }
    }


}