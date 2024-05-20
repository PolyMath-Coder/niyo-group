import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserEntity } from "src/shared/entities.ts/user.entity";
import { TaskEntity } from "src/tasks/entities/task.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'User') {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
    ) { 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET 
        })
    }

    validate(payload: any) {
        return { _id: payload._id, email: payload.email, firstName: payload.firstName, lastName: payload.lastName }
    }
}