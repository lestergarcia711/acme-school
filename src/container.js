import { TransactionManager } from './config/TransactionManager.js';
import { StudentRepository } from './repositories/StudentRepository.js';
import { InscriptionRepository } from './repositories/IncriptionRepository.js';
import { StudentService } from './services/StudentService.js';
import { InscriptionService } from './services/InscriptionService.js';

export function buildContainer(pool) {
    const tx = new TransactionManager(pool);

    const studentRepo = new StudentRepository(pool);
    const inscriptionRepo = new InscriptionRepository(pool);

    return {
        studentService: new StudentService(studentRepo),
        inscriptionService: new InscriptionService({ studentRepo, inscriptionRepo, tx })
    };
}