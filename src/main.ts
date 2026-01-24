import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ERP API')
    .setDescription('THE ERP API DESCRIPTION')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // main.ts
  app.use((req, _res, next) => {
    console.log('--- NEW REQUEST ---');
    console.log('Path:', req.path);
    console.log('Auth Header:', req.headers.authorization);
    next();
  });

  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`ERP is running on : ${await app.getUrl()}`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
bootstrap();
