import { Column , Entity , PrimaryGeneratedColumn } from "typeorm";

// ASSOCIATIONS
import { ManyToOne } from "typeorm"; // many reports have one user
import { User } from "src/users/users.entity";

@Entity()
export class Report{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    price : number;

    @Column()
    make : string;

    @Column()
    model : string;

    @Column()
    year : number

    @Column()
    lng : number;

    @Column()
    lat : number;

    @Column()
    mileage : number;

    // deleted the db after making this change
    // @ManyToOne() - causes a change in the report db , it will add a new column that will store the id of each user
    // building association between User and Report
    // understand this decorator in more detail 
    @ManyToOne( () => User , (user) => user.reports)
    user : User

    @Column({ default : false })
    approved : boolean;
}