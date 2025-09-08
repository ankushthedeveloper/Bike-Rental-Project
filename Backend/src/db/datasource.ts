import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Bike } from './entities/bike.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'bikerental.db',
  entities: [User, Bike],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
});
