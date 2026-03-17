import { HttpInterceptorFn } from '@angular/common/http';

export const errorMappingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
