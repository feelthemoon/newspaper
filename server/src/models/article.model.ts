import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface IArticle {
  title: string;
  description: string;
  imgSrc: string;
  author: string;
  remoteUrl: string;
  publishedDate: string;
  categories: Array<string>;
}

@Table({ tableName: 'Article' })
export class Article extends Model<Article, IArticle> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING(500), allowNull: false })
  title: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  description: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  imgSrc: string;

  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  remoteUrl: string;

  @Column({ type: DataType.DATE, allowNull: false })
  publishedDate: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  categories: Array<string>;
}
