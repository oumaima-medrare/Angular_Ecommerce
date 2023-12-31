import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ContactformComponent } from './pages/contactform/contactform.component';
import { AuthGuard } from './guards/auth.guard';
import { UserDetailsGuard } from './guards/userDetails.guard';

const routes: Routes = [
  { path: '', component: ProductsComponent, pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'orders',
    component: OrdersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: 'users', component: UsersComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactformComponent, pathMatch: 'full' },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    canActivate: [UserDetailsGuard],
  },
  { path: '**', component: ProductsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
