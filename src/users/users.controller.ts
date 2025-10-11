import { Body, Controller , Post  , Get , Patch , Param , Query , Delete , NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

// to exclude few properties in api response : option 1
import { UseInterceptors , ClassSerializerInterceptor } from "@nestjs/common";

@Controller('auth')
export class UsersController {

    constructor(public usersService : UsersService){}

    @Post('/signup')
    createUser(@Body() body : CreateUserDto){
        // console.log(body);

        this.usersService.create(body.email , body.password);
    }

    // to exclude few properties in api response : option 1
    // this converts the 'user' entity into a plain obj based on the rule defined in User Entity
    @UseInterceptors(ClassSerializerInterceptor)
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
