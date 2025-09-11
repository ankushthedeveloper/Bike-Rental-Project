import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('bikes')
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  brand: string;

  @Column({ length: 50 })
  model: string;

  @Column()
  year: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @Column()
  distanceTraveled: number;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ type: 'integer', nullable: true, default: 0 })
  rentPerDay: number;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ type: 'integer', nullable: true, default: 0 })
  noOfBikes: number;
}
