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

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_jwt_secret', // Use env variable in production!
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Bike]),
  ],
  controllers: [UsersController, BikesController],
  providers: [UsersService, BikesService, AuthService],
})
export class apiModule {}
