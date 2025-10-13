import { Injectable , NestMiddleware } from "@nestjs/common";
import { Request , Response , NextFunction } from "express";
import { UsersService } from "../users.service";

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

            // @ts-ignore
            req.currentUser = user;
        }

        next();
    }
}