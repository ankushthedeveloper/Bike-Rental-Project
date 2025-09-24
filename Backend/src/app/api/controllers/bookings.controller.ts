import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { BookingService } from '../services/bookings.service';
import { BikesService } from '../services/bikes.service';
import { UsersService } from '../services/users.service';
import { AdminRoleGuard } from 'src/app/gaurds/adminGaurd';
import { AuthGuard } from 'src/app/gaurds/auth.gaurd';

@Controller('booking')
export class BookingsController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly bikeService: BikesService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard, AdminRoleGuard)
  @Get()
  async findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createBooking(@Body() body: CreateBookingDto) {
    if (!body.bikeId || !body.userId || !body.startDate || !body.endDate) {
      throw new BadRequestException('Missing required fields');
    }
    const bike = await this.bikeService.findOne(Number(body.bikeId));
    const user = await this.userService.findOne(Number(body.userId));
    if (!bike || !user) {
      throw new BadRequestException('Invalid bike or user ID');
    }
    return this.bookingService.create(body);
  }

  @UseGuards(AuthGuard, AdminRoleGuard)
  @Put(':id')
  async updateBooking(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: CreateBookingDto,
  ) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @UseGuards(AuthGuard, AdminRoleGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.remove(id);
  }
  @UseGuards(AuthGuard, AdminRoleGuard)
  @Put('complete/:id')
  async markBookingAsCompleted(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.markBookingAsCompleted(id);
  }

  @UseGuards(AuthGuard)
  @Get('active/user/:userId')
  async getActiveBookings(@Param('userId') userId: string) {
    const bookings = await this.bookingService.getActiveBookings({ userId });
    const updatedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const bikeDetails = await this.bikeService.findOne(
          Number(booking.bikeId),
        );
        return {
          ...booking,
          bikeDetails,
        };
      }),
    );
    return updatedBookings;
  }

  @UseGuards(AuthGuard)
  @Get('completed/user/:userId')
  async getCompletedBookings(@Param('userId') userId: string) {
    const bookings = await this.bookingService.getCompletedBookings({ userId });
    const updatedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const bikeDetails = await this.bikeService.findOne(
          Number(booking.bikeId),
        );
        return {
          ...booking,
          bikeDetails,
        };
      }),
    );
    return updatedBookings;
  }
}
