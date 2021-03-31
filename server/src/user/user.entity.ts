import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User>{
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	name: string

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	surname: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	username: string;

	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	email: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true
	})
	notification:boolean;
}