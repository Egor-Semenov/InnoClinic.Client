import { Appointment } from "../appointments/Appointment";

export class Doctor {
    public userId: string;
    public firstName: string;
    public lastName: string;
    public middleName: string;
    public birthDate: string;
    public email: string;
    public specialization: string;
    public officeId: number;
    public appointments!: Appointment[];

    constructor(userId: string, firstName: string, lastName: string, middleName: string, birthDate: string, email: string, specialization: string, officeId: number) {
        this.userId = userId;
        this.firstName = firstName
        this.lastName = lastName
        this.middleName = middleName
        this.birthDate = birthDate
        this.email = email
        this.specialization = specialization
        this.officeId = officeId
    }
}