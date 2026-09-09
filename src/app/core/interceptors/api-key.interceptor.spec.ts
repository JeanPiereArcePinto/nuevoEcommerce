import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { apiKeyInterceptor } from './api-key.interceptor';

describe('apiKeyInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiKeyInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  it('agrega las credenciales a Supabase y conserva los datos de la petición', () => {
    const url = `${environment.supabaseUrl}/product`;
    const body = { nombre: 'Producto de prueba' };
    http.post(url, body, { headers: { Prefer: 'return=representation' } }).subscribe();

    const request = controller.expectOne(url);
    expect(request.request.headers.get('apikey')).toBe(environment.supabaseKey);
    expect(request.request.headers.get('Authorization')).toBe(`Bearer ${environment.supabaseKey}`);
    expect(request.request.headers.get('Prefer')).toBe('return=representation');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(body);
    request.flush([]);
  });

  it.each([
    '/assets/data.json',
    'https://example.com/api',
    `${new URL(environment.supabaseUrl).origin}.example.com/rest/v1/product`,
  ])('no agrega credenciales a %s', (url) => {
    http.get(url).subscribe();

    const request = controller.expectOne(url);
    expect(request.request.headers.has('apikey')).toBe(false);
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({});
  });
});
