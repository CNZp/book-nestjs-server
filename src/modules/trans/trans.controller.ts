import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { TransService } from './trans.service';
import { Logger } from 'nestjs-pino';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { TransDto } from './dto/trans.dto';
import { Page } from '../page/entity/page.entity';

@Controller('trans')
@UseFilters(new TypeormFilter()) //错误 信息返回封装
// @UseGuards(JwtGuard) //守卫，设置token
export class TransController {
  constructor(
    private transService: TransService,
    private logger: Logger,
  ) {
    this.logger.log('Trans');
  }

  @Post()
  findOrCreate(@Body() dto: TransDto): any {
    //@Body data参数
    // todo 解析Body参数
    const page = dto as Page;
    return this.transService.findOrCreate(page);
  }
}
