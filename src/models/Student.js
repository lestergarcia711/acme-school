import { Person} from './Person.js';

export class Student extends Person{
    constructor({id, code, firstName, lastName, identificationTypeId, identificationNumber, gender, birthdate, email, address, cityId}){
       super({id, firstName, lastName, identificationTypeId, identificationNumber, email});
       this.code = code;
       this.gender = gender;
       this.birthdate =birthdate;
       this.address = address;
       this.cityId = cityId

    }
}