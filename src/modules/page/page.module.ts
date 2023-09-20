import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino'; //日志打印工具
import { Page } from './entity/page.entity';
import { Section } from './entity/section.entity';
import { PageService } from './page.service';
import { PageController } from './page.controller';
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
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
