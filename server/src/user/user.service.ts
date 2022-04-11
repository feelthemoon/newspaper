import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { AuthorizationDto } from '../authorization/authorization.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  create(user: AuthorizationDto) {
    return this.userRepository.create({ ...user, username: user.email });
  }

  findBy(field: string, value: number | string | boolean) {
    return this.userRepository.findOne({ where: { [field]: value } });
  }
}
