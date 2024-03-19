export class Service {
    public serviceId: number;
    public serviceName: string;
    public specializationId: number;
    public serviceCategoryId: number;
    public price: number;

    constructor(serviceId: number, serviceName: string, specializationId: number, serviceCategoryId: number, price: number){
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.specializationId = specializationId;
        this.serviceCategoryId = serviceCategoryId;
        this.price = price;
    }
}