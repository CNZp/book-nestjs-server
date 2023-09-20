import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino'; //日志打印工具
import { TransController } from './trans.controller';
import { TransService } from './trans.service';
import { Page } from '../page/entity/page.entity';
import { PageService } from '../page/page.service';
import { Section } from '../page/entity/section.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Page, Section]),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty', //打印日志样式优化
          options: {
            colorize: true,
          },
        },
      },
    }),
  ],
  controllers: [TransController],
  providers: [TransService, PageService],
})
export class TransModule {}
