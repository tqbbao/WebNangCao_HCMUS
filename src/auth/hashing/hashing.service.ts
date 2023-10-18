import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}