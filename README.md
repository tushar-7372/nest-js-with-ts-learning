## general

in this project , i have learned about the following topics : 

=> to run the project 
> npm run  start:dev ( check package.json , scripts )

=> installing typeORM and sqlite3 for managing db
> npm install @nestjs/typeorm typeorm sqlite3

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

===
what is done in this commit : 
to make use of custom interceptors, we were using complex code @UseInterceptors(new SerializeInterceptor(UserDto)) , refactored this with the help of custom decorators , we will further improve this by applying it to all routes and removing any type : made small improvement on this part