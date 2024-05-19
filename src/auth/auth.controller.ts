import { Controller, Get, Post, Body,  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';
import { AuthRoute } from 'src/shared/constants';

@Controller(AuthRoute.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthRoute.REGISTER)
  register(@Body() createAuthDto: RegisterDto) {
    return this.authService.create(createAuthDto);
  }

  @Post()
  login() {
    return this.authService.findAll();
  }

}
