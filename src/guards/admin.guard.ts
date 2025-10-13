import { CanActivate , ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate{

    canActivate(context: ExecutionContext): boolean {
        // context : is the request , here we can check the req 
        // this returns boolean value

        const request = context.switchToHttp().getRequest();

        if(!request.currentUser)
            return false;

        // if(request.currentUser.admin)
        //     return true;
        return request.currentUser.admin
    }
}