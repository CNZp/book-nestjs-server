import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino'; //日志打印工具
import { Book } from './entity/book.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
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
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
