import { Injectable } from '@nestjs/common';
import { RegisterDto} from './dto/auth.dto';


@Injectable()
export class AuthService {
  create(createAuthDto: RegisterDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

}
