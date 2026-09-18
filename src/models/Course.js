export class Course {
    constructor({ id, code, description, intensity, weight, active =1}){
        this.id = id;
        this.code = code ;
        this.description = description;
        this.intensity = intensity;
        this.weight = weight;
        this.active = active;

    }
}