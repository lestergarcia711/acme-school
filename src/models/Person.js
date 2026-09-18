export class Person{
    constructor({id, firstName, lastName, identificationTypeId, identificationNumber, email
    }){
        if (this.constructor === Person){
            throw new Error("No se puede instanciar la clase Person directamente");

        }
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationTypeId = identificationTypeId;
        this.identificationNumber = identificationNumber;
        this.email = email;
    }

    getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }
}