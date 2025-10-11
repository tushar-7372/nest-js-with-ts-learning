import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // for security purpose , removes all other additional fields from request payload, compares with dto
      whitelist : true,
    }),
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
