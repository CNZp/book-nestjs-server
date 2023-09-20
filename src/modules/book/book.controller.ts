import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Logger } from 'nestjs-pino';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { Book } from './entity/book.entity';
import { BookQueryDto } from './dto/book.query.dto';
import { BookFindDto } from './dto/book.find.dto';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('book')
@UseFilters(new TypeormFilter()) //错误 信息返回封装
@UseGuards(JwtGuard)
export class BookController {
  constructor(
    private bookService: BookService,
    private logger: Logger,
  ) {
    this.logger.log('Book');
  }

  @Get('default')
  findOrCreateDefaultBook(
    @Query() query: BookFindDto,
    @Request() request,
  ): any {
    query.userId = request.user.userId;
    //分页查询
    return this.bookService.findOrCreateDefaultBook(query);
  }
  @Get()
  queryPage(@Query() query: BookQueryDto, @Request() request): any {
    query.userId = request.user.userId;
    //分页查询
    return this.bookService.queryPage(query);
  }
  //
  @Post('add')
  addBook(@Body() dto: any, @Request() request): any {
    const book = dto as Book;
    book.userId = request.user.userId;
    return this.bookService.create(book);
  }

  @Post('changeDefaultBook')
  changeDefaultBook(@Body() dto: any, @Request() request): any {
    const book = dto as Book;
    book.userId = request.user.userId;
    return this.bookService.changeDefaultBook(book);
  }

  @Patch('/:id')
  updateBook(
    @Body() dto: any,
    @Param('id') id: number,
    @Request() request,
  ): any {
    // todo 传递参数id
    // todo 异常处理
    const book = dto as Book;
    book.userId = request.user.userId;
    return this.bookService.update(id, book);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: number): any {
    // todo 传递参数id
    return this.bookService.remove(id);
  }
}
