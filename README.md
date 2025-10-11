## general
**: commands :**

=> to run the project 
> npm run  start:dev ( check package.json , scripts )

=> installing typeORM and sqlite3 for managing db
> npm install @nestjs/typeorm typeorm sqlite3

**: topics 1 :**

=> pipes ( for validating incoming req )
- need to install these 2 packages
> npm install class-validator class-transformer

=> for testing the api , we can use vs code extension 'api client' or postman
using api client here

=> all about database
- typeorm , Repository
- creating an entity
- using hooks 
- using Repository function for interacting with db ( eg : UsersService )

=> excluding few properties in api response ( option 1)
- understanding UseInterceptors ClassSerializerInterceptor

=> excluding few properties in api response ( option 2)
- writting custom interceptors and using dto

**: topics 2 ( current ) :**
- creating a service (AuthService) inside UsersModule that users will call for creating account and login in ( internally we will hash the password )
- auth service via DEPENDENCY INJECTION is making use of users service to create an user
- internally implementing SALT and HASHING
- in the controller for singup , we are using DTO to verify the incoming req
- while sending the response , we are making use of CUSTOM INTERCEPTORS to send the response
-
-
- installing a package to manage cookie 
> npm install cookie-session @types/cookie-session
- using 'cookie-session' and setting it up in 'main.ts' file
- creating 2 routes in UsersController to understand cookie and session
-
- saving the user id in cookie when someone hits signin or login api
- use case : to know who is current signed in user
- creating routes using this : to check who is the current signed in user , sign out api
- creating a CUSTOM DECORATOR , making use of createParamDecorator , file : current.user.decorator.ts

- **commit**

- Param decorators exist outside the DI system , so our decorator cannot get an instance of UserService directly, to solve this we will have to make use of DECORATOR + INTERCEPTOR , file : current-user.interceptor.ts
- to make sure that our 'current-user.interceptor.ts' runs before the req starts getting handled by the controller , so that in the req we have user , we used @UseInterceptors(CurrentUserInterceptor) in the user controller
- 