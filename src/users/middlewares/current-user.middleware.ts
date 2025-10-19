import { Injectable , NestMiddleware } from "@nestjs/common";
import { Request , Response , NextFunction } from "express";
import { UsersService } from "../users.service";

// the error that we were getting below 
// @ts-ignore req.currentUser = user; -> this we are trying to fix 
import { User } from "../users.entity";
declare global{
    namespace Express {
        interface Request {
           	currentUser?: User | null 
        }
    }
}
// this is saying find the Express library , find the interface Request and add one more propertly to it ( currentUser )

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{

    constructor(private usersService : UsersService){
        }

    async use(req : Request , res : Response , next : NextFunction){

        // we need to access the user entity here , so we can fetch the user data from db
        // for that we will have to make use of DI
        // marking this class as @Injectable()

        const {userId} = req.session || {};

        if(userId){
            const user = await this.usersService.findOne(userId);

            req.currentUser = user;
        }

        next();
    }
}