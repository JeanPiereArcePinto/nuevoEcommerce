import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { NotFoundComponent } from './features/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio | NitroShop' },
  { path: 'catalogo', loadComponent: () => import('./features/product-list/product-list').then((m) => m.ProductListComponent), title: 'Catálogo | NitroShop' },
  { path: 'producto/:id', loadComponent: () => import('./features/product-detail/product-detail').then((m) => m.ProductDetailComponent), title: 'Detalle | NitroShop' },
  { path: 'carrito', loadComponent: () => import('./features/cart/cart').then((m) => m.CartComponent), title: 'Carrito | NitroShop' },
  { path: 'admin', loadComponent: () => import('./features/product-admin/product-admin').then((m) => m.ProductAdminComponent) },
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent) },
  { path: 'registro', loadComponent: () => import('./features/auth/registro/registro').then((m) => m.RegistroComponent) },
  { path: '**', component: NotFoundComponent, title: 'Página no encontrada | NitroShop' },
];
