import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth.service';

// to make use of DI , we have to mark that class as Injectable and add it to providers[] array in module file
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

// to make CurrentUserInterceptor global scoped
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [UsersController],
  // providers: [UsersService , AuthService , CurrentUserInterceptor],

  providers: [UsersService , AuthService ,
    {
      provide : APP_INTERCEPTOR,
      useClass : CurrentUserInterceptor
    } // this will apply CurrentUserInterceptor globally
  ],

  imports : [
    // this will create a repo from the User entity
    TypeOrmModule.forFeature([User]),
  ]
})
export class UsersModule {}
