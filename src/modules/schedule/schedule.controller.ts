import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Logger } from 'nestjs-pino';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { ScheduleQueryDto } from './dto/schedule.dto';

@Controller('schedule')
@UseFilters(new TypeormFilter()) //错误 信息返回封装
// @UseGuards(JwtGuard) //守卫，设置token
export class ScheduleController {
  constructor(
    private scheduleService: ScheduleService,
    private logger: Logger,
  ) {
    this.logger.log('Schedule');
  }

  @Get()
  queryAllTitle(@Query() query: ScheduleQueryDto): any {
    //分页查询
    return this.scheduleService.queryAllTitle(query);
  }
}
