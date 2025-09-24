import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bikeId: string;

  @Column()
  userId: string;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @Column({ nullable: true })
  totalPrice: number;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: 'active' | 'completed';
}
