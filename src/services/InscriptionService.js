export class InscriptionService {
    constructor({studentRepo, inscriptionRepo, tx}){
        this.studentRepo = studentRepo;
        this.inscriptionRepo = inscriptionRepo;
        this.tx = tx;
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
        const inscriptionId = await this.tx.run((connection) =>
         this.inscriptionRepo.save({
             studentId: Number(studentId),
             courseScheduleId: Number(courseScheduleId),
             registerDate: new Date()
         }, connection)
      ) ;
        
        return{
            success: true,
            inscriptionId,
            message: `Estudiante ${student.getFullName()} inscrito exitosamente.`
        };

    }
    async getEnrollmentReport(){
        return await this.inscriptionRepo.findDetailedInscriptions();
    }
}