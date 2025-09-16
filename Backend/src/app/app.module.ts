import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from 'src/db/entities/bike.entity';
import { User } from 'src/db/entities/user.entity';
import { apiModule } from './api/api.module';
import { Booking } from 'src/db/entities/booking.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'bikely.db',
      entities: [Bike, User, Booking],
      synchronize: true,
      migrationsRun: true,
      migrations: ['dist/db/migrations/*.js'],
    }),
    apiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
