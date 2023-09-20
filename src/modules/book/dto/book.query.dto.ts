import { BookTypeEnum } from 'src/enum/book.enum';

export interface BookQueryDto {
  page: number;
  limit?: number;
  type?: BookTypeEnum;
  title?: string;
  userId: string;
}
