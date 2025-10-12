import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/report.entity';

// for reading values from .env file 
import { ConfigModule , ConfigService } from '@nestjs/config';
import { config } from 'process';
// ConfigModule - it helps to sepcify which of the two files to read value from '.env.development' or '.env.test'
// ConfigService - it will provide that value for the rest of the service

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal : true, // it makes this ConfigModule global scoped in thie project , we donot need to import this service in any other module
      envFilePath : `.env.${process.env.NODE_ENV}` // path of the env file
    }),

    UsersModule, ReportsModule,

    // setting up the connection between type orm , sqlite and app module
    // TypeOrmModule.forRoot({
    //   type : 'sqlite', //type of db that we want to use
    //   database : 'db.sqlite', //a file db.sqlite will be created in root directory
    //   entities : [User , Report],
    //   synchronize : true
    // })
    // database : 'db.sqlite', : if development mode then use file 'db.sqlite' , if test use 'test.sqlite'
    // for this , we cannot directly use ConfigService , we nned to use DI fiest
    // using DI , we will get access to ConfigService here 

    TypeOrmModule.forRootAsync({
      inject : [ConfigService],
      useFactory :  (config : ConfigService) => {
        return {
          type : 'sqlite', 
          database : config.get<string>('DB_NAME'), 
          entities : [User , Report],
          synchronize : true
        }
      }
    })
    // That's what tells the dependency injection system that we want to go and find the configuration service which should have all of our config info inside of it from our chosen file. And we want to get access to that instance of the config service during the setup of our type orm.
    // Then as a second argument or a second property inside of here, we're going to put in use factory. So this is the dependency injection part. This is where we are going to get our copy or the instance of the config service that again should have all the information from our env file inside of it.

    // This is going to be a function that is going to receive our instance of the config service.

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
