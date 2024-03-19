export class ReceptionistParameters{
    constructor(
        public officeId: number = 0,
        public searchTerm: string = "",
        public pageNumber: number = 1,
        public pageSize: number = 5
    ){}
}