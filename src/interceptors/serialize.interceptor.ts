import { UseInterceptors , NestInterceptor ,  ExecutionContext , CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassContructor{
    new (...args: any[]) : {}
}

export function Serialize(dto : ClassContructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto : any){
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {

        return next.handle().pipe(
            map( (data : any) => {
                
                return plainToClass(this.dto , data , {
                    excludeExtraneousValues : true // this only sends the fields marked with @Expose() decorator
                })
            })
        )
    }
}