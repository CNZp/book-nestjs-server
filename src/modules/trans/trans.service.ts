import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import * as crypto from 'crypto';
import { Page } from '../page/entity/page.entity';
import { PageService } from '../page/page.service';

@Injectable()
export class TransService {
  constructor(
    @InjectRepository(Page) private readonly pageRepository: Repository<Page>,
    private pageService: PageService,
  ) {}
  async findOrCreate(page: Page) {
    const { bookId, title } = page;
    let finded = await this.pageRepository.findOne({
      where: { bookId, title },
    });
    if (!finded) {
      const result = await this.askBaiduTrans(title);
      if (result) {
        page.content = result;
      }
      finded = await this.pageService.create(page);
      finded.isNew = true;
    } else {
      finded = await this.pageService.update(finded.id, finded);
    }
    return finded;
  }
  async askBaiduTrans(q: string) {
    const url = 'https://fanyi-api.baidu.com/api/trans/vip/translate';
    const appid = '20190104000254433';
    const secret = 'WnDlUSTqezN3Bt98qMyC';
    const salt = '1435660288';

    const md5 = crypto.createHash('md5');
    const sign = md5.update(appid + q + salt + secret).digest('hex');

    const fullUrl =
      url +
      '?q=' +
      q +
      '&from=en&to=zh&appid=' +
      appid +
      '&salt=' +
      salt +
      '&sign=' +
      sign;
    try {
      const response = await axios.get(fullUrl);
      const data = response.data;
      let result = '';
      if (data.trans_result?.length) {
        result = data.trans_result[0].dst;
      }
      return result;
    } catch (error) {
      // 处理错误
      throw new Error('Failed to fetch data from API.');
    }
  }
}
