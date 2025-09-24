import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../../db/entities/booking.entity';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { Bike } from 'src/db/entities/bike.entity';
// import { UpdateBookingDto } from '../dtos/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Bike)
    private readonly bikeRepository: Repository<Bike>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const bike = await this.bikeRepository.findOne({
      where: { id: Number(createBookingDto.bikeId) },
    });
    if (!bike) throw new NotFoundException('Bike not found');
    const booking = this.bookingRepository.create(createBookingDto);
    const startDate = new Date(createBookingDto.startDate).getTime();
    const endDate = new Date(createBookingDto.endDate).getTime();
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    booking.totalPrice = Number(bike.rentPerDay) * days;
    await this.bookingRepository.save(booking);
    return this.bookingRepository.save(booking);
  }

  async update(
    id: number,
    updateBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    Object.assign(booking, updateBookingDto);
    return this.bookingRepository.save(booking);
  }

  async remove(id: number): Promise<void> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    await this.bookingRepository.remove(booking);
  }

  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    const bookings = await this.bookingRepository.find({ where: { userId } });
    return bookings;
  }
  async markBookingAsCompleted(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    booking.status = 'completed';
    return this.bookingRepository.save(booking);
  }

  async getActiveBookings({ userId }: { userId: string }): Promise<Booking[]> {
    return this.bookingRepository.find({ where: { status: 'active', userId } });
  }
  async getCompletedBookings({
    userId,
  }: {
    userId: string;
  }): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { status: 'completed', userId },
    });
  }
}
