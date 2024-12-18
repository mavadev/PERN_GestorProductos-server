import { Table, Column, Model, DataType, Default, Index } from 'sequelize-typescript';

@Table({
	tableName: 'products',
	timestamps: false,
})
class Product extends Model {
	@Index
	@Column({
		primaryKey: true,
		autoIncrement: true,
		type: DataType.INTEGER,
	})
	declare id: number;

	@Column({
		type: DataType.STRING(100),
	})
	declare name: string;

	@Column({
		type: DataType.FLOAT,
	})
	declare price: number;

	@Default(true)
	@Column({
		type: DataType.BOOLEAN,
	})
	declare availability: boolean;
}

export default Product;
