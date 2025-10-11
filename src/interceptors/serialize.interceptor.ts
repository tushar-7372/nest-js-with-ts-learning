import { UseInterceptors , NestInterceptor ,  ExecutionContext , CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
// import { UserDto } from "src/users/dtos/user.dto";

export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto : any){
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {
        
        // run something before the request is handled by the req handler
        // console.log('running before the handler ' , context);

        return next.handle().pipe(
            map( (data : any) => {
                // run something before the response is sent out
                // console.log('running before the response is sent out ' , data);

                // what this does : we created a dto called UserDto which we contains rules to share the reposne
                // it is converting the plain 'data' to UserDto

                // problem here : this SerializeInterceptor reponse is tightly mapped with UserDto , which we want to make generic
                return plainToClass(this.dto , data , {
                    excludeExtraneousValues : true // this only sends the fields marked with @Expose() decorator
                })
            })
        )
    }
}