import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from 'src/db/entities/bike.entity';
import { User } from 'src/db/entities/user.entity';
import { apiModule } from './api/api.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'cats.db',
      entities: [Bike, User],
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
