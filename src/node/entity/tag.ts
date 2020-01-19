import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn  } from 'typeorm';
import { Article } from './article';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 200,
    nullable: false
  })
  name: string;

  // 一个tag可以包含多篇文章，所以这里是多对多的关系
  @ManyToMany(type => Article, article => article.tags, { cascade: true })
  @JoinTable({
    name: 'article_tags',
    joinColumn: { name: 'tid' },
    inverseJoinColumn: { name: 'aid' },
  })
  articles: Article[];

  @CreateDateColumn()
  public readonly createdAt!: Date;

  @UpdateDateColumn()
  public readonly updatedAt!: Date;
}
