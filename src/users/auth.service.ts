import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes , scrypt as _scrypt } from "crypto";
import { promisify } from "util"; 
// scrypt - hash function but it returns a promise which needs to used using callbacks , to avoid using callbacks we are using 'promisify'
const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService{

    constructor(private usersService : UsersService){}

    async singup(email : string , password : string){
        
        // 1 : check if the user is already saved , yes , throw error
        // all repo functions are async functions
        const users = await this.usersService.find(email);
        if(users.length){
            throw new BadRequestException('email already in use');
        }

        // 2 :  hash the user's password
            // generate the salt
            // combine password and salt
            // hash the combination
            // hashed combination + salt - save to db
        
        const salt = randomBytes(8).toString('hex');

        // when we use await scrypt(password , salt , 32); - ts is not able to guess the type of response to fix this we use as
        const hash = (await scrypt(password , salt , 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');


        // 3 : create a new user and save it
        const user = this.usersService.create(email , result );

        // return the user
        return user;
    }

    singin(){

    }

}