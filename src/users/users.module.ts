import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],

  imports : [
    // this will create a repo from the User entity
    TypeOrmModule.forFeature([User]),
  ]
})
export class UsersModule {}
