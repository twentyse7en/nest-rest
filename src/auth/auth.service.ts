import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = this.userRepository.create({
            username,
            password
        });
        try {
            await this.userRepository.save(user);
          } catch (error) {
            if (error.code === '23505') {
              // duplicate username
              throw new ConflictException('Username already exists');
            } else {
              throw new InternalServerErrorException();
            }
          }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return ;
    }
}
