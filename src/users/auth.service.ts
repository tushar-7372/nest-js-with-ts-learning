import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService{

    constructor(private usersService : UsersService){}

    async singup(email : string , password : string){
        // hash the user's password
        // create a new user and save it
        // return the user
        
        // 1 : check if the user is already saved , yes , throw error
        // all repo functions are async functions
        const users = await this.usersService.find(email);
        if(users.length){
            throw new BadRequestException('email already in use');
        }


        
    }

    singin(){

    }

}