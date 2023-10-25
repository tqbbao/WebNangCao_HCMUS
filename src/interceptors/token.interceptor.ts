import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        // Before the request is handled
        tap(() => {
          const request = context.switchToHttp().getRequest();
          const accessToken = request.headers['authorization'];
          if (!this.isValidToken(accessToken)) {
            // If the token is invalid or expired, refresh the token
            this.refreshToken();
          }
        }),
        // If there's an error (e.g., a 401 Unauthorized response)
        catchError(err => {
          if (err.status === 401) {
            // If a 401 error occurs, refresh the token
            this.refreshToken();
          }
          throw err;
        })
      );
  }

  // Mock function to check if the token is valid
  private isValidToken(token: string): boolean {
    // Your logic to check if the token is valid or expired
    return true; // Assume the token is valid for simplicity
  }

  // Mock function to refresh the token
  private refreshToken(): void {
    // Your logic to refresh the token
  }
}
