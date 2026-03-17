import { HttpInterceptorFn } from '@angular/common/http';

export const authPlaceholderInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
