import { CanActivate , ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate{

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // context : is the request , here we can check the req 
        // this returns boolean value

        const request = context.switchToHttp().getRequest();

        return request.session.userId;
    }
}