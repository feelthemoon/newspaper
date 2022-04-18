import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface ICurrency {
  currencyName: string;
  currencyValue: number;
}

@Table({ tableName: 'Currency' })
export class Currency extends Model<Currency, ICurrency> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currencyName: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  currencyValue: number;
}
