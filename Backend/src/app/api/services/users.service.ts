import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../db/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { SignUpDto } from '../dtos/sign-up-dto';
import { LogInDto } from '../dtos/log-in.dto';
import { AuthService } from './auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.remove(user);
  }

  async signUp(signInDto: SignUpDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: signInDto.email },
    });
    if (existingUser) throw new BadRequestException();
    const user = this.userRepository.create(signInDto);
    const AuthToken = await this.authService.generateToken(user);
    user.authToken = AuthToken.access_token;
    this.userRepository.save(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async logIn(logInDto: LogInDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: logInDto.email, password: logInDto.password },
    });
    if (!user) throw new NotFoundException('User not found');
    const AuthToken = await this.authService.generateToken(user);
    user.authToken = AuthToken.access_token;
    this.userRepository.save(user);
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
