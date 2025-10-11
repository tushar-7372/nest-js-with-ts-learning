import {
    createParamDecorator,
    ExecutionContext
}from '@nestjs/common'

export const CurrentUser = createParamDecorator(
    (data : any , context : ExecutionContext) => {
        // context : ExecutionContext - this is the incoming request 
        // ExecutionContext - handles all types of request , other option context : Request
        return 'hi there';
    }
)