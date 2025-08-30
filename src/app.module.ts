import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

import * as process from 'node:process';
import { AwsSdkModule } from 'nest-aws-sdk';
import { SharedIniFileCredentials } from 'aws-sdk';
import { FilesModule } from './files/files.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseWrapperInterceptor } from '../common/interceptors/response.wrapper.interceptor';
import { ShipTypeModule } from './ship-type/ship-type.module';
import { ShipModule } from './ship/ship.module';
import { SectionModule } from './section/section.module';
import { LoadModule } from './load/load.module';
import { CalculationModule } from './calculation/calculation.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USER_DB_NAME}:${process.env.USER_DB_PASSWORD}@cluster0.0fxwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: () => {
          if (process.env.LAMBDA_TASK_ROOT && process.env.AWS_EXECUTION_ENV) {
            return {};
          }
          return {
            credentials: new SharedIniFileCredentials({
              profile: 'personal',
            }),
          };
        },
      },
    }),
    FilesModule,
    ShipTypeModule,
    ShipModule,
    SectionModule,
    LoadModule,
    CalculationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseWrapperInterceptor,
    },
  ],
})
export class AppModule {}
