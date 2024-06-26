import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';
import { AuthRoute } from 'src/shared/constants';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller(AuthRoute.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthRoute.REGISTER)
  async register(@Body() createAuthDto: RegisterDto, @Res() res) {
     const response = await this.authService.registerUser(createAuthDto);
     res.status(response.responseCode).send(response)
  }


 @UseGuards(LocalAuthGuard)
  @Post(AuthRoute.LOGIN)
  async login(@Req() req, @Res() res) {
   const response = await this.authService.login(req.user)
   res.status(response.responseCode).send(response)
  }

}
