import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { PageQueryDto } from './dto/page.query.dto';
import { PageService } from './page.service';
import { Page } from './entity/page.entity';

@Controller('page')
@UseFilters(new TypeormFilter()) //错误 信息返回封装
// @UseGuards(JwtGuard) //守卫，设置token
export class PageController {
  constructor(
    private pageService: PageService,
    private logger: Logger,
  ) {
    this.logger.log('Page');
  }

  @Get()
  queryPage(@Query() query: PageQueryDto): any {
    //分页查询
    return this.pageService.queryPage(query);
  }

  @Get('/:id')
  findOneWithSections(@Param('id') id: number): any {
    //分页查询
    return this.pageService.findOneWithSections(id);
  }

  @Post('add')
  addPage(@Body() dto: any): any {
    const page = dto as Page;
    return this.pageService.create(page);
  }

  @Patch('/:id')
  updatePage(@Body() dto: any, @Param('id') id: number): any {
    // todo 传递参数id
    // todo 异常处理
    const page = dto as Page;
    return this.pageService.update(id, page);
  }

  @Delete('/:id')
  deletePage(@Param('id') id: number): any {
    // todo 传递参数id
    return this.pageService.remove(id);
  }
}
