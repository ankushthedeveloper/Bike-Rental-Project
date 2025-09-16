import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from '../../../db/entities/bike.entity';
import { CreateBikeServiceDto } from '../dtos/create-bike.dto';
import { UpdateBikeDto } from '../dtos/update-bike.dto';

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike)
    private readonly bikeRepository: Repository<Bike>,
  ) {}

  async findAll(): Promise<Bike[]> {
    return this.bikeRepository.find();
  }

  async findOne(id: number): Promise<Bike> {
    const bike = await this.bikeRepository.findOne({ where: { id } });
    if (!bike) throw new NotFoundException('Bike not found');
    return bike;
  }

  async create(createBikeDto: CreateBikeServiceDto): Promise<Bike> {
    const bike = this.bikeRepository.create(createBikeDto.createBikeDto);
    bike.images = createBikeDto.images;
    return this.bikeRepository.save(bike);
  }

  async update(id: number, updateBikeDto: UpdateBikeDto): Promise<Bike> {
    const bike = await this.bikeRepository.findOne({ where: { id } });
    if (!bike) throw new NotFoundException('Bike not found');
    Object.assign(bike, updateBikeDto);
    console.log(updateBikeDto);
    return this.bikeRepository.save(bike);
  }

  async remove(id: number): Promise<void> {
    const bike = await this.bikeRepository.findOne({ where: { id } });
    if (!bike) throw new NotFoundException('Bike not found');
    await this.bikeRepository.remove(bike);
  }
}
