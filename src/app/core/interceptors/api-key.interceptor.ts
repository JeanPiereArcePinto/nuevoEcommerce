import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const SUPABASE_API_KEY = environment.supabaseKey;
const SUPABASE_ORIGIN = new URL(environment.supabaseUrl).origin;

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  let origin: string;
  try {
    origin = new URL(req.url).origin;
  } catch {
    return next(req);
  }

  if (origin !== SUPABASE_ORIGIN) {
    return next(req);
  }

  const reqConApiKey = req.clone({
    setHeaders: {
      apikey: SUPABASE_API_KEY,
      Authorization: `Bearer ${SUPABASE_API_KEY}`,
    },
  });

  return next(reqConApiKey);
};
