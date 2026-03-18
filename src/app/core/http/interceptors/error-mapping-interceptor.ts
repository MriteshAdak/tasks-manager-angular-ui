import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AppErrorModel } from '../../error/app-error-model';

const FALLBACK_CODE = 'TASK_UNKNOWN_ERROR';
const FALLBACK_MESSAGE = 'Unexpected error while processing request.';

export const errorMappingInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const envelope = error.error?.error;
      const mapped: AppErrorModel = {
        code: envelope?.code ?? FALLBACK_CODE,
        message: envelope?.message ?? FALLBACK_MESSAGE,
        httpStatus: envelope?.httpStatus ?? (error.status || 500),
        requestId: envelope?.requestId ?? error.headers.get('x-request-id') ?? 'unknown',
        details: envelope?.details,
      };

      return throwError(() => mapped);
    })
  );
