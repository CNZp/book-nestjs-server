import { IsNotEmpty, IsString, Length } from 'class-validator';
import { BookTypeEnum } from 'src/enum/book.enum';

export class CreateBookDto {
  @IsNotEmpty()
  type: BookTypeEnum;

  @IsString()
  @IsNotEmpty()
  @Length(0, 100)
  title: string;

  @IsString()
  @Length(0, 1000)
  content: string;
}
