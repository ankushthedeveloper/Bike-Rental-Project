import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { BikesController } from './controllers/bikes.controller';
import { UsersService } from './services/users.service';
import { BikesService } from './services/bikes.service';
import { User } from 'src/db/entities/user.entity';
import { Bike } from 'src/db/entities/bike.entity';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { BookingsController } from './controllers/bookings.controller';
import { BookingService } from './services/bookings.service';
import { Booking } from 'src/db/entities/booking.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Bike, Booking]),
  ],
  controllers: [UsersController, BikesController, BookingsController],
  providers: [UsersService, BikesService, AuthService, BookingService],
})
export class apiModule {}
