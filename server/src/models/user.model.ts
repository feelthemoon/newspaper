import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface IUser {
  email: string;
  username?: string;
  password: string;
  firstName?: string;
  confirm: boolean;
  avatar?: string;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, IUser> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  firstName: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  confirm: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;
}
