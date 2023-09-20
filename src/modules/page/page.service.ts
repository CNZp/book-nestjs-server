import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Page } from './entity/page.entity';
import { PageQueryDto } from './dto/page.query.dto';
import { Section } from './entity/section.entity';
@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page) private readonly pageRepository: Repository<Page>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}
  queryPage(query: PageQueryDto) {
    //动态查询
    const { limit, page, bookId, title } = query;
    const take = limit || 10;
    const where: any = { bookId };
    if (title) {
      where.title = Like(`%${title}%`);
    }
    return this.pageRepository
      .find({
        where,
        order: {
          isFavorite: 'DESC',
          updateAt: 'DESC',
        },
        take: take + 1,
        skip: (page - 1) * take,
      })
      .then((result) => {
        return {
          limit: take,
          page,
          hasNext: result.length > take,
          data: result.slice(0, take),
        };
      });
  }
  async findOneWithSections(id: number) {
    // const page = await this.pageRepository.findOne({
    //   where: { id },
    //   relations: ['sections'],
    // });

    const page = await this.pageRepository
      .createQueryBuilder('page')
      .where({ id })
      .leftJoinAndSelect('page.sections', 'section')
      .orderBy({ 'section.sort': 'ASC' })
      .getOne();

    return page;
  }
  async create(page: Partial<Page>) {
    const newPage = await this.pageRepository.create(page);
    return this.pageRepository.save(newPage);
  }
  async update(id: number, page: Partial<Page>) {
    if (page.removeSectionIds?.length) {
      await this.sectionRepository.delete({ id: In(page.removeSectionIds) });
    }
    const existPage = await this.findOneWithSections(id);
    const newPage = this.pageRepository.merge(existPage, page);
    return this.pageRepository.save(newPage);
  }
  remove(id: number) {
    return this.pageRepository.delete(id);
  }
}
