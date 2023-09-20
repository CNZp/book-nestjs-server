import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino'; //日志打印工具
import { Page } from '../page/entity/page.entity';
import { PageService } from '../page/page.service';
import { Section } from '../page/entity/section.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
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
  controllers: [ScheduleController],
  providers: [ScheduleService, PageService],
})
export class ScheduleModule {}
