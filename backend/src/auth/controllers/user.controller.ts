import { Controller, Get } from '@nestjs/common';
import { UserRepository } from 'libs/database/repository/user.repository';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get()
  findAll() {
    return this.userRepository.findAll();
  }
}
