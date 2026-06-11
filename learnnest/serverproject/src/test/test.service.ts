import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getTitle() {
    return '我是 test service title';
  }
}
