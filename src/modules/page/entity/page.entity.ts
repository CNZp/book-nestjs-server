import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Section } from './section.entity';

@Entity()
export class Page {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键id' })
  id: number;

  @Column({
    type: 'bigint',
    nullable: false,
    name: 'book_id',
    comment: '本子id',
  })
  bookId: string;

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
    comment: '是否收藏',
  })
  isFavorite: boolean;

  @OneToMany(() => Section, (section) => section.page, { cascade: true })
  sections: Section[];

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'update_at',
    comment: '更新时间',
  })
  updateAt: Date;

  isNew: boolean;

  removeSectionIds: string[];
}
