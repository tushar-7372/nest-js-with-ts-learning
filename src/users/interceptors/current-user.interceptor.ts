import { NestInterceptor,
    ExecutionContext , 
    CallHandler,
    Injectable
 } from "@nestjs/common";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{

    constructor(private userService : UsersService){
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const request  = context.switchToHttp().getRequest();
        // destructuring
        const {userId} = request.session || {} ;

        if(userId){
            // here , this interceptor was able to get the current user by making use of UsersService
            const user = this.userService.findOne(userId);

            // how do we pass this user to our current user decorator ??
            // our current user decorator has access to request , if we somehow bind this user to request , the user can be fetched there 
            
            // now since the user is a part of request , it can be accessed from request anywhere
            request.currentUser = user;
        }

        return next.handle();
    }
}