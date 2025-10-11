import { Body, Controller , Post  , Get , Patch , Param , Query , Delete , NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

import { Serialize } from 'src/interceptors/serialize.interceptor';

import { AuthService } from './auth.service';

// to manage cookie session 
import { Session } from '@nestjs/common';

import { CurrentUser } from './decorators/current-user.decorator';

// to make sure that our 'current-user.interceptor.ts' runs before the req starts getting handled by the controller , so that in the req we have user
import { UseInterceptors } from '@nestjs/common';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './users.entity';

// addding this decorator makes sure that our current 'current-user.interceptor.ts' runs before the req starts getting handled by the controller , so that in the req we have user
@UseInterceptors(CurrentUserInterceptor)
@Serialize(UserDto)
@Controller('auth')
export class UsersController {

    // dependency injection
    constructor(private usersService : UsersService , 
        private authService : AuthService
    ){}

    // on the basis of the user id stored in the session , it will return the user data ; can be used to check who is currently logged in
    // @Get('/whoami')
    // whoAmI(@Session() session : any){
    //     // if session.userId = null , then return this.repo.findOneBy({ id }) returns the first user , not null
    //     return this.usersService.findOne(session.userId);
    // }

    // we want to extend the use case of the above 'whoami' - we want to create a custom decorator which when called gives the current user 
    @Get('/whoami')
    whoAmI(@CurrentUser() currentUser : User){
        return currentUser;
    }

    // for understanding cookie and session
    // route 1 : set color in the session object
    // @Get('/colors/:color')
    // setColor(@Param('color') color : string , @Session() session : any){
    //     session.color = color;
    // }

    // // route 2 : get color from the session object
    // @Get('/colors')
    // getColor(@Session() session : any){
    //     return session.color;
    // }

    // here ,signout , kindof means remove the user id from the current session
    @Post('/signout')
    signout(@Session() session : any){
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body : CreateUserDto , @Session() session : any){
        // this.usersService.create(body.email , body.password);

        // using AuthService
        // return this.authService.singup(body.email , body.password);

        // maintaining the id of this user in the session
        const user = await this.authService.singup(body.email , body.password);
        session.userId = user.id;
        return user;
    }

    // note async and await here
    @Post('/signin')
    async singin(@Body() body : CreateUserDto , @Session() session : any){

        // return this.authService.singin(body.email,body.password);

        // maintaining the id of this user in the session
        const user = await this.authService.singin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/:id')
    async findUser(@Param('id') id : string){
        const user = await this.usersService.findOne(parseInt(id));

        if(!user){
            throw new NotFoundException('user not found');
        }

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email : string){
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id : string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id : string , @Body() body : UpdateUserDto){
        return this.usersService.update(parseInt(id) , body);
    }
}
