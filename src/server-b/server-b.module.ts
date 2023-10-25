import { Module } from '@nestjs/common';
import { ServerBService } from './server-b.service';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { CryptoService } from 'src/auth/hashing/crypto.service';

@Module({
  providers: [ServerBService,
    {
      provide: HashingService,
      useClass: CryptoService
    },]
})
export class ServerBModule {}
