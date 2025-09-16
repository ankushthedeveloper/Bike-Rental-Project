import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { SignUpDto } from '../dtos/sign-up-dto';
import { LogInDto } from '../dtos/log-in.dto';
import type { Response } from 'express';
import { AuthGuard } from 'src/app/gaurds/auth.gaurd';
import { AdminRoleGuard } from 'src/app/gaurds/adminGaurd';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, AdminRoleGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard, AdminRoleGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard, AdminRoleGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Post('signUp')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, authToken } = await this.usersService.signUp(signUpDto);
    res.cookie('authToken', authToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return user;
  }

  @Post('logIn')
  async logIn(
    @Body() logInDto: LogInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, authToken } = await this.usersService.logIn(logInDto);
    res.cookie('authToken', authToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { user, message: 'Login successful', status: 200 };
  }
}
