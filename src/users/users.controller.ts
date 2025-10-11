import { Body, Controller , Post  , Get , Patch , Param , Query , Delete , NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

import { Serialize } from 'src/interceptors/serialize.interceptor';

import { AuthService } from './auth.service';

// to manage cookie session 
import { Session } from '@nestjs/common';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {

    // dependency injection
    constructor(private usersService : UsersService , 
        private authService : AuthService
    ){}

    // for understanding cookie and session
    // set color in the session object
    @Get('/colors/:color')
    setColor(@Param('color') color : string , @Session() session : any){
        session.color = color;
    }

    // get color from the session object
    @Get('/colors')
    getColor(@Session() session : any){
        return session.color;
    }

    @Post('/signup')
    createUser(@Body() body : CreateUserDto){
        // this.usersService.create(body.email , body.password);

        // using AuthService
        return this.authService.singup(body.email , body.password);
    }

    @Post('/signin')
    singin(@Body() body : CreateUserDto){

        return this.authService.singin(body.email,body.password);
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
