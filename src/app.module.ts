import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnum } from './enum/config.enum';
import { User } from './modules/user/user.entity';
import { Profile } from './modules/user/profile.entity';
import { Roles } from './modules/roles/roles.entity';
import { Logs } from './modules/logs/logs.entity';
import { AuthModule } from './modules/auth/auth.module';
import { LogsModule } from './modules/logs/logs.module';
import { RolesModule } from './modules/roles/roles.module';
import { BookModule } from './modules/book/book.module';
import { Book } from './modules/book/entity/book.entity';
import { TransModule } from './modules/trans/trans.module';
import { Page } from './modules/page/entity/page.entity';
import { Section } from './modules/page/entity/section.entity';
import { PageModule } from './modules/page/page.module';
import { ScheduleModule } from './modules/schedule/schedule.module';

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DB_PORT: Joi.number().default(3306),
        DB_HOST: Joi.string().ip(),
        DB_TYPE: Joi.string().valid('mysql', 'postgres'),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get(ConfigEnum.DB_TYPE),
          host: configService.get(ConfigEnum.DB_HOST),
          port: configService.get(ConfigEnum.DB_PORT),
          username: configService.get(ConfigEnum.DB_USERNAME),
          password: configService.get(ConfigEnum.DB_PASSWORD),
          database: configService.get(ConfigEnum.DB_DATABASE),
          entities: [User, Profile, Logs, Roles, Book, Page, Section],
          // 同步本地的schema与数据库 -> 初始化的时候去使用
          synchronize: configService.get(ConfigEnum.DB_SYNC),
          logging: process.env.NODE_ENV === 'development',
        }) as TypeOrmModuleOptions,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3090,
    //   username: 'root',
    //   password: '123456',
    //   database: 'testdb',
    //   entities: [],
    //   synchronize: true,
    //   logging: ['error'],
    // }),
    UserModule,
    LogsModule,
    RolesModule,
    AuthModule,
    BookModule,
    PageModule,
    TransModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
