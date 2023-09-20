import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Page } from './page.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键id' })
  id: number;

  @Column({
    type: 'bigint',
    nullable: false,
    name: 'page_id',
    comment: '页面id',
  })
  pageId: string;

  @ManyToOne(() => Page, (page) => page.sections)
  @JoinColumn({
    name: 'page_id',
    referencedColumnName: 'id',
  })
  page: Page;

  @Column({
    type: 'varchar',
    nullable: true,
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
    type: 'integer',
    nullable: true,
    comment: '顺序',
  })
  sort: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 2,
    comment: '状态',
  })
  state: string;
}
