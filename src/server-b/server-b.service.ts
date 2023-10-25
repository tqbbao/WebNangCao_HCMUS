import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class ServerBService {
  constructor(
    private readonly hashingService: HashingService,
    private configService: ConfigService,
  ) {}
  private readonly secretKey = this.configService.get<string>('SECRET_KEY');

  async fetchDataFromServerB(endpoint: string): Promise<AxiosResponse<any>> {
    try {
      const timestamp = new Date().getTime().toString();
      const encrypted = await this.hashingService.hash(
        endpoint,
        timestamp,
        this.secretKey,
      );
      console.log('encrypted', encrypted);
      const headersRequest = {
        headers: {
          Authorization: `ApiKey ${encrypted}`,
          'x-time': timestamp,
        },
      };
      const response = await axios.get(
        `http://localhost:3001/film`,
        headersRequest,
      );
      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: 403,
          error: 'Forbidden',
        },
        403,
      );
    }
  }
}
