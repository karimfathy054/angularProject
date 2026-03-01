import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Home } from './components/home/home';
import { ProductsViewer } from './components/products-viewer/products-viewer';
import { AddProductForm } from './components/forms/add-product-form/add-product-form';
import { EditProduct } from './components/edit-product/edit-product';
import { DeleteProduct } from './components/delete-product/delete-product';
import { NotFound } from './components/not-found/not-found';
import { ProductDetails } from './components/product-details/product-details';
import { UpdateProductForm } from './components/forms/update-product-form/update-product-form';
import { LoginForm } from './components/forms/login-form/login-form';
import { RegisterForm } from './components/forms/register-form/register-form';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'login', component: LoginForm },
      { path: 'register', component: RegisterForm },
      { path: 'products', component: ProductsViewer, canActivate: [authGuard] },
      { path: 'products/:id', component: ProductDetails, canActivate: [authGuard] },
      { path: 'add-product', component: AddProductForm, canActivate: [authGuard] },
      { path: 'edit-product', component: EditProduct, canActivate: [authGuard] },
      {
        path: 'edit-product/:id',
        component: UpdateProductForm,
        canActivate: [authGuard],
      },
      { path: 'delete-product', component: DeleteProduct, canActivate: [authGuard] },
    ],
  },
  { path: '**', component: NotFound },
];
