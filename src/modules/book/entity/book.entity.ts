import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookTypeEnum } from 'src/enum/book.enum';

@Entity()
export class Book {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键id' })
  id: number;

  @Column({
    type: 'enum',
    enum: BookTypeEnum,
    default: BookTypeEnum.NOTE,
    comment: '类型',
  })
  type: BookTypeEnum;

  @Column({
    type: 'bigint',
    nullable: false,
    name: 'user_id',
    comment: '用户id',
  })
  userId: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 200,
    comment: '标题',
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 1000,
    comment: '内容',
  })
  content: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: '是否默认',
  })
  isDefault: boolean;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'update_at',
    comment: '更新时间',
  })
  updateAt: Date;
}
