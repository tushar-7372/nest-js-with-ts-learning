import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// due to some configuration issue with ts config setup , below import statement from 'cookie-session' is not compatible
// we will have to use require
// import {CookieSession} from 'cookie-session';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // for security purpose , removes all other additional fields from request payload, compares with dto
      whitelist : true,
    }),
  )

  // set up for managing cookie
  app.use(cookieSession({
    keys : ['ahijoaio'] // this random string will b eused to encrypt the cookie key , in dev env , it is ok to use any random string
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
