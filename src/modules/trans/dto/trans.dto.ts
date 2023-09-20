import { IsNotEmpty, IsString, Length } from 'class-validator';

export class TransDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @IsString()
  @IsNotEmpty()
  bookId: string;
}
