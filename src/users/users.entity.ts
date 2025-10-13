import { AfterInsert , AfterRemove , AfterUpdate ,Entity , Column , PrimaryGeneratedColumn } from "typeorm";
// to understand why we use option 1 (create and save) instead of option 2 (save)

// ASSOCIATIONS
import { OneToMany } from "typeorm"; // one user has many reports
import { Report } from "src/reports/report.entity"; // importing Report Entity to establish the association

// to exclude few properties in api response : option 1
// when we are sending the user data , we are also sending the user's password which is not correct
// import { Exclude } from "class-transformer";

// we can call this file UserEntity ( class name + type of file ) 
// but as a convention for entity file name , we call it User
// applying decorators
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    email : string;

    // @Exclude() //decorator to exclude this field
    @Column()
    password : string;

    // after an user is inserted into db this function will be called
    // type orm provides feature to use functions here : hooks
    // @AfterInsert() is one such Hook decorator
    @AfterInsert()
    logInsert(){
        console.log('inserted user with id ' , this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log('updated user with id ' , this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log('removed user with id ' , this.id);     
    }

    // building association between User and Report
    // understand this decorator in more detail 
    @OneToMany(() => Report , (report) => report.user)
    reports : Report[]

    // for using AdminGuard
    @Column({ default : true }) 
    admin : boolean;
}