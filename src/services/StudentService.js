export class StudentService {
    constructor(studentRepo) {
        this.studentRepo = studentRepo;
    }

    async list() {
        return await this.studentRepo.findAll();
    }

async register(data) {
    const clean = (value) =>
        typeof value === 'string' && value.trim() === '' ? null : value;

    const code = `STU-${Date.now().toString().slice(-4)}`;
    const id = await this.studentRepo.save({
        ...data,
        gender: clean(data.gender),
        birthdate: clean(data.birthdate),
        email: clean(data.email),
        address: clean(data.address),
        code
    });
    return { id, code };
}
}