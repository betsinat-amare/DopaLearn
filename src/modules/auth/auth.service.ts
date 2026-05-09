import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async register(dto: RegisterUserDto) {
        const { confirmPassword, ...data } = dto;

        if (dto.password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        return this.usersService.createUser(data);
    }
}
