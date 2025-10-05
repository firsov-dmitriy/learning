// api/index.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { AuthGuard } from './auth/auth.guard';
import { PrismaService } from './prisma/prisma.service';
import { TokenService } from './auth/token.service';
import { VercelRequest, VercelResponse } from '@vercel/node';

const server = express();
let nestApp: any = null;

async function bootstrap() {
  if (!nestApp) {
    nestApp = await NestFactory.create(AppModule, new ExpressAdapter(server), {
      cors: true,
    });

    nestApp.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    const tokenService = nestApp.get(TokenService);
    const prismaService = nestApp.get(PrismaService);
    const reflector = nestApp.get('Reflector');

    nestApp.useGlobalGuards(
      new AuthGuard(tokenService, reflector, prismaService),
    );

    nestApp.use(bodyParser.json());
    nestApp.use(cookieParser());

    nestApp.setGlobalPrefix('api', { exclude: ['api'] });

    // Swagger setup (можно отключить на проде)
    const configSwagger = new DocumentBuilder()
      .setTitle('Nest Profile')
      .setDescription('This TODO: description')
      .setVersion('0.1')
      .addTag('Nest')
      .build();
    const swaggerDocument = SwaggerModule.createDocument(
      nestApp,
      configSwagger,
    );
    SwaggerModule.setup('api/swagger', nestApp, swaggerDocument);

    nestApp.use((req, res, next) => {
      console.log(`[${req.method}] ${req.originalUrl}`);
      next();
    });

    await nestApp.init(); // Важно для Serverless
  }
  return server;
}

// Экспорт handler для Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrap();
  app(req, res);
}
