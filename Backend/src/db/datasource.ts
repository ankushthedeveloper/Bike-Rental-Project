import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Bike } from './entities/bike.entity';
import { Booking } from './entities/booking.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'bikely.db',
  entities: [User, Bike, Booking],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
});
