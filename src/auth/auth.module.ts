import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities.ts/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
config()

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, JwtModule.register({secret: process.env.JWT_SECRET, signOptions: {expiresIn: '4h'}})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
