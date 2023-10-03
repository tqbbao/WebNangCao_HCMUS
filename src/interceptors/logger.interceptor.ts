import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerServiceRotation } from 'src/helpers/LoggerServiceRotation';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerServiceRotation) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // ** SET COLOR METHOR **
    // ** NHẬN BODY REQUEST **
    const requestBody = request.body;
    // Đảm bảo requestBody là một object (nếu không, chuyển đổi nó)
    const bodyAsObject =
      typeof requestBody === 'object' ? requestBody : { body: requestBody };

    console.log(JSON.stringify(bodyAsObject));
    
    const now = Date.now();

    // ** NHẬN RESPONSE **
    return next.handle().pipe(
      tap((response_data) => {
        console.log(`After...Tap ${Date.now() - now}ms`);
        if (response_data && response_data.message && response_data.data) {
          console.log('Message:', response_data.message);
          console.log('Status Code:', response_data.statusCode);
          console.log('Data:', response_data.data);
        }

        // ** GHI LOG **
        console.log('=====================================');
        this.loggerService.log(
          `${JSON.stringify(bodyAsObject)} -- [${
            response_data.statusCode
          }] -- [${request.method}] -- ${request.url} -- ${
            response_data.message
          }`,
        );
        // this.loggerService.log(
        //   `${request.method} ${request.url} ${response.statusCode} ${Date.now() -
        //     now}ms`,
        // );
      }),
      catchError((err) => {
        console.log(`After...CatchError ${Date.now() - now}ms`);
        console.log(err.response);
        // ** GHI LOG **
        this.loggerService.error(
          `${JSON.stringify(bodyAsObject)} -- [${
            err.response.statusCode
          }] -- [${request.method}] -- ${request.url} -- ${
            err.response.message
          }`,
          'err.stack',
        );
        console.log('=====================================');
        throw err;
      }),
    );
  }
}
