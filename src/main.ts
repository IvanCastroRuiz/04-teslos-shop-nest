import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const config = new DocumentBuilder()
    .setTitle('Teslo Shop')
    .setDescription('The Teslo Shop API description')
    .setVersion('1.0')
    .addTag('Teslo Shop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');

  app.useGlobalPipes( 
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
   );

  await app.listen(process.env.PORT);
  logger.log(`Services started on port: ${process.env.PORT}`);
}
bootstrap();
