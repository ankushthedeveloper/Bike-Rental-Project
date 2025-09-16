import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { BikesService } from '../services/bikes.service';
import { CreateBikeDto } from '../dtos/create-bike.dto';
import { UpdateBikeDto } from '../dtos/update-bike.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from '../../../config/multerStorage';
import { File as MulterFile } from 'multer';
import { AuthGuard } from 'src/app/gaurds/auth.gaurd';
import { AdminRoleGuard } from 'src/app/gaurds/adminGaurd';

@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @UseGuards(AuthGuard, AdminRoleGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, { storage }))
  async createBike(
    @Body() createBikeDto: CreateBikeDto,
    @UploadedFiles() images: MulterFile[],
  ) {
    const imageUrls = images.map((file) => file.path);
    return this.bikesService.create({ createBikeDto, images: imageUrls });
  }

  @Get()
  async findAll() {
    return this.bikesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bikesService.findOne(id);
  }

  @UseGuards(AuthGuard, AdminRoleGuard)
  @UseInterceptors(FilesInterceptor('images', 5, { storage }))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBikeDto: UpdateBikeDto,
  ) {
    console.log('updateBikeDto from controller', updateBikeDto);
    return this.bikesService.update(id, updateBikeDto);
  }

  @UseGuards(AuthGuard, AdminRoleGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.bikesService.remove(id);
  }
}
