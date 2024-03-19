export class Specialization{
    public specializationId: number;
    public specializationName: string;
    public status: number;

    constructor(specializationId: number, specializationName: string, status: number){
        this.specializationId = specializationId;
        this.specializationName = specializationName;
        this.status = status;
    }
}