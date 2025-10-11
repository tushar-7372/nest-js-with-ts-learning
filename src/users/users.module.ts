import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth.service';

// to make use of DI , we have to mark that class as Injectable and add it to providers[] array in module file
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  controllers: [UsersController],
  providers: [UsersService , AuthService , CurrentUserInterceptor],

  imports : [
    // this will create a repo from the User entity
    TypeOrmModule.forFeature([User]),
  ]
})
export class UsersModule {}
