import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {status: true, message: 'the world is a safe place...'};
  }
}
