import { Expose , Transform } from "class-transformer";
import { User } from "src/users/users.entity";

export class ReportDto{

    @Expose()
    id : number;

    @Expose()
    price : number;

    @Expose()
    year : number;

    @Expose()
    lng : number;

    @Expose()
    lat : number;

    @Expose()
    make : number;

    @Expose()
    model : number;

    @Expose()
    mileage : number;

    // transform the respone obj , obj is the response obj take it fetch user and get id
    // create a new field userId and pass the extracted data in this field
    @Transform( ({obj}) => obj.user.id )
    @Expose()
    userId : number;

    @Expose()
    approved : boolean;
}