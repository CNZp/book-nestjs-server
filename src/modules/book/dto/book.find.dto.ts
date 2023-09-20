import { BookTypeEnum } from 'src/enum/book.enum';

export interface BookFindDto {
  title?: string;
  type: BookTypeEnum;
  userId: string;
}
