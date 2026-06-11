import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserList() {
    return [1, 2, 3, 4, 5];
  }

  getUserOne() {
    return ['one'];
  }
}
