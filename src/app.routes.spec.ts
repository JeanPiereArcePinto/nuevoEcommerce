import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app/app.routes';
import { LoginComponent } from './app/features/auth/login/login';
import { AuthService } from './app/core/services/auth.service';
import { CheckoutComponent } from './app/features/checkout/checkout';
import { RegistroComponent } from './app/features/auth/registro/registro';


describe('Acceso al checkout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
  });

  it('redirige a login cuando se intenta acceder sin sesión', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/checkout', LoginComponent);

    expect(TestBed.inject(Router).url).toBe('/login');
    expect(TestBed.inject(AuthService).isLoggedIn()).toBe(false);
  });

  it('inicia sesión desde el formulario y navega al checkout', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/login', LoginComponent);
    const page = harness.routeNativeElement!;

    const email = page.querySelector<HTMLInputElement>('[formControlName="email"]')!;
    email.value = 'demo@example.com';
    email.dispatchEvent(new Event('input', { bubbles: true }));

    const password = page.querySelector<HTMLInputElement>('[formControlName="password"]')!;
    password.value = 'demo123';
    password.dispatchEvent(new Event('input', { bubbles: true }));
    harness.detectChanges();

    const submit = page.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    expect(submit.disabled).toBe(false);
    submit.click();
    await harness.fixture.whenStable();

    expect(TestBed.inject(AuthService).usuario()).toEqual({
      nombre: 'Usuario Demo',
      email: 'demo@example.com',
    });
    expect(TestBed.inject(Router).url).toBe('/checkout');
    expect(harness.routeDebugElement?.componentInstance).toBeInstanceOf(CheckoutComponent);
  });

  it('permite acceder al registro sin sesión', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/registro', RegistroComponent);

    expect(TestBed.inject(Router).url).toBe('/registro');
  });
});
