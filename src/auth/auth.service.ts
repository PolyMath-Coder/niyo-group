import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto} from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities.ts/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { ErrorResponse } from 'src/shared/responses/error';
import { SuccessResponse } from 'src/shared/responses/success';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}
  async registerUser({firstName, lastName, email, password}: RegisterDto) {
    const check_user = await this.userRepo.findOneBy({email: email})
    if(check_user) {
      return ErrorResponse(400, 'Oops! user already exists', null, null) 
    }
    const hashed_password = await bcrypt.hash(password, 10)
    const user_payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashed_password,
    }

   const data = await this.userRepo.save(user_payload)

    const user_data =  {
      _id: data._id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    }

    const token = this.jwtService.sign(JSON.parse(JSON.stringify(user_data)))

    return SuccessResponse(201, 'user creation successful...', { ...user_data, token: token }, null)
  
  }

 
  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email })
    if(!user) {
      return ErrorResponse(404, 'user not found...', null, null)
    }

    const compare_password = await bcrypt.compare(password, user.password)
    if(!compare_password) {
      return ErrorResponse(400, 'incorrect password inputted...', null, null)
    }
    return user
  }
  login(user: LoginDto) {
    const user_data =  {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }
    const token = this.jwtService.sign(JSON.parse(JSON.stringify(user_data)))

    return SuccessResponse(200, 'Login successful...', { ...user_data, token: token }, null)
  }

}
