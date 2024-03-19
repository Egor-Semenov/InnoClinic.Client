export class ServiceParameters{
    public specializationId: number;
    public serviceCatsegoryId: number;

    constructor(specializationId: number, serviceCategoryId: number){
        this.specializationId = specializationId;
        this.serviceCatsegoryId = serviceCategoryId;
    }
}