import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { BikesController } from './controllers/bikes.controller';
import { UsersService } from './services/users.service';
import { BikesService } from './services/bikes.service';
import { User } from 'src/db/entities/user.entity';
import { Bike } from 'src/db/entities/bike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bike])],
  controllers: [UsersController, BikesController],
  providers: [UsersService, BikesService],
})
export class apiModule {}
