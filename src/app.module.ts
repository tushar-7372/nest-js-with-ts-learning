import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    UsersModule, ReportsModule,

    // setting up the connection between type orm , sqlite and app module
    TypeOrmModule.forRoot({
      type : 'sqlite', //type of db that we want to use
      database : 'db.sqlite', //a file db.sqlite will be created in root directory
      entities : [User , Report],
      synchronize : true
    })
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
