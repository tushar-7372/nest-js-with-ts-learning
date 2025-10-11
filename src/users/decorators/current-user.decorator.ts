import {
    createParamDecorator,
    ExecutionContext
}from '@nestjs/common'

export const CurrentUser = createParamDecorator(
    (data : never , context : ExecutionContext) => {
        // context : ExecutionContext - this is the incoming request 
        // ExecutionContext - handles all types of request , other option context : Request
        // return 'hi there';

        // what is this 'data' argument ? 
        // when we call this custom decorator for eg @CurrentUser() whatever value we give inside it , is the data 
        // @CurrentUser("iamdata") - data = "iamdata"
        // since , our use case is to call this decorator to get the current user , no argument will be required 
        // so , we will update data : any to data : never

        // to get the current session user , we need to extract the session id from the request
        // use this session id to call the userService to get the user from db

        // getting the request
        const request  = context.switchToHttp().getRequest();

        // PURPOSE OF THIS CUSTOM DECORATOR : we want to return the details of the current session user
        // 1 : from the req , we get the id of the user from the session object
        // 2 : using this user id , we need to fetch the details of the user by calling user service findOne(id : number){} method
        // problem : user service is injectable ( provider ) i.e. part of di system 
        // so in this custom decorator , we cannot directly create an instance of UserService to get the user by id

        // Param decorators exist outside the DI system , so our decorator cannot get an instance of UserService directly
        // to solve this we will have to make use of DECORATOR + INTERCEPTOR
        // we will create an interceptor for this decorator , all decorators are a part of DI system , this interceptor will interact with the UserService
        // console.log(request.session.userId);
        // return 'hi there';

        // but to get the user from this decorator , the 'current-user.interceptor.ts' has to run first , then only we can get the user from the request
        return request.currentUser;
    }
)