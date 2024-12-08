import { Table, Column, Model, DataType, Default, Scopes } from 'sequelize-typescript';

@Scopes(() => ({
	defaultScope: {
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
	},
}))
@Table({
	tableName: 'products',
})
class Product extends Model {
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
