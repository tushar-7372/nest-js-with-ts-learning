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

**: topics 2 :**
- creating a service (AuthService) inside UsersModule that users will call for creating account and login in ( internally we will hash the password )
- auth service via DEPENDENCY INJECTION is making use of users service to create an user
- internally implementing SALT and HASHING
- in the controller for singup , we are using DTO to verify the incoming req
- while sending the response , we are making use of CUSTOM INTERCEPTORS to send the response
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
-
- Param decorators exist outside the DI system , so our decorator cannot get an instance of UserService directly, to solve this we will have to make use of DECORATOR + INTERCEPTOR , file : current-user.interceptor.ts
- to make sure that our 'current-user.interceptor.ts' runs before the req starts getting handled by the controller , so that in the req we have user , we used @UseInterceptors(CurrentUserInterceptor) in the user controller
- 
- improving CurrentUserInterceptor from controller scoped to global scoped
- 
- rejecting requests to a certain handler if the user is not sugned in ( GUARD )

**: topics 3 :**
- to manage the config we are installing a package 
> npm install @nestjs/config
- creating different .env files ( for development and test ) and using values from this .env file in 'app.module.ts'
- understanding ConfigModule and ConfigService from @nestjs/config package ( usage in 'app.module.ts')
- in 'app.module.ts' we are specifying env.NODE_ENV , this is set from script's command (package.json), for adding env in the script's command , we are going use a command line package 'cross-env'
> npm install cross-env

**: topics 4 ( report module ) :**
- creating routes 
- creating DTO for incoming req
- using reports service in reports controller ( DI ( Injectable , providers , constructor ))
- using Guards
- connecting report controller , report service -> ( using ReportEntity ) -> type orm Repository to save in db
-
- ASSOCIATIONS ( relating one record with another )
- connected user entity with reports entity
-
- understand OneToMany() and ManyToOne() decorator and it's argument - ?
- using ASSOCIATION => use case : whenever a report is created , we want to associate it with the user who created it
- making association between report created and the user who created it
-
- currently , create report api returns the report created and the user data ( including password ) as api response which is not ideal - fixing this 
- build a report dto that will have the fields we want to expose and use in the INTERCEPTOR to manipulate the api response
- making use of Transform() decorator
- 
- **commit**
- use case : when the reports are created , it will have 'approved' value as false , someone will approve it 
- added a new route and added a new column in reports table , created a DTO to validate the req of this api