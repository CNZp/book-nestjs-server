import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { BookQueryDto } from './dto/book.query.dto';
import { BookFindDto } from './dto/book.find.dto';
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}
  async findOrCreateDefaultBook(query: BookFindDto) {
    const { type, userId } = query;
    let finded = await this.bookRepository.findOne({
      where: { type, isDefault: true, userId },
    });
    if (!finded) {
      let title = '初始本';
      if (type === 'trans') {
        title = '初始单词本';
      } else if (type === 'note') {
        title = '初始笔记本';
      } else if (type === 'schedule') {
        title = '初始日程本';
      }
      finded = await this.create({ title, type, isDefault: true, userId });
    }
    return finded;
  }
  async changeDefaultBook(book: Partial<Book>) {
    const { type, userId } = book;
    const finded = await this.bookRepository.findOne({
      where: { type, isDefault: true, userId },
    });
    if (finded) {
      finded.isDefault = false;
      await this.bookRepository.save(finded);
    }
    book.isDefault = true;
    return this.bookRepository.save(book);
  }
  queryPage(query: BookQueryDto) {
    //动态查询
    const { limit, page, type, title, userId } = query;
    const take = limit || 10;
    const where: any = { type, userId };
    if (title) {
      where.title = Like(`%${title}%`);
    }
    return this.bookRepository
      .find({
        where,
        order: {
          isDefault: 'DESC',
          updateAt: 'DESC',
        },
        take: take + 1, //多查一条，以判断有无更多
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

  findOne(id: number) {
    return this.bookRepository.findOne({ where: { id } });
  }

  async create(book: Partial<Book>) {
    const bookTmp = this.bookRepository.create(book);
    const res = await this.bookRepository.save(bookTmp);
    return res;
  }
  async update(id: number, book: Partial<Book>) {
    const bookTemp = await this.findOne(id);
    const newBook = this.bookRepository.merge(bookTemp, book);
    return this.bookRepository.save(newBook);
  }
  remove(id: number) {
    return this.bookRepository.delete(id);
  }
}
