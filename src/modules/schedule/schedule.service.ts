import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../page/entity/page.entity';
import { ScheduleQueryDto } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Page) private readonly pageRepository: Repository<Page>,
  ) {}

  queryAllTitle(query: ScheduleQueryDto) {
    const { bookId } = query;
    return this.pageRepository.find({
      select: {
        id: true,
        title: true,
      },
      where: {
        bookId,
      },
    });
  }
}
