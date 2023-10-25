import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { HashingService } from 'src/auth/hashing/hashing.service';


@Injectable()
export class ServerBService {
    constructor(private readonly hashingService: HashingService) {}
  private readonly serverBUrl = 'http://localhost:3001'; 
  private readonly secretKry = 'ZTtyJiKZq2cQFnFeAnHzNslLYf7PrWhv';

  async fetchDataFromServerB(endpoint: string): Promise<AxiosResponse<any>> {
    try {
      const timetemp = new Date().getTime().toString()

      console.log(timetemp)
      console.log(endpoint)
      console.log(this.secretKry)

      const encrypted = await this.hashingService.hash(
        endpoint,
        timetemp,
        this.secretKry
      );
      console.log("encrypted", encrypted)
        const headersRequest = {
        headers: {
          Authorization: `ApiKey ${encrypted}`,
          'x-time': timetemp,
        },
      };
      const response = await axios.get(
        `http://localhost:3001/film`,
        headersRequest,
      ); 
      return response;
    } catch (error) {
      // throw new Error(`Error fetching data from serverB: ${error.response.status}`);
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
