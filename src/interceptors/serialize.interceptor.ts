import { UseInterceptors , NestInterceptor ,  ExecutionContext , CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
// import { UserDto } from "src/users/dtos/user.dto";

// 1 : Serialize(dto : any) : here if we pass any thing not just classes even plain string , ts doesnot give any error
// 2 : while runnning it will give errors 
// to fix 1 , we have created an interface that checks the argument must be a class ( any class )
interface ClassContructor{
    new (...args: any[]) : {}
}

// decorators are just plain function , making our own custom decorator
export function Serialize(dto : ClassContructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

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