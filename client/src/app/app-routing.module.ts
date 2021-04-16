import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './guards/auth.guard'
import { HomeComponent } from './home/home.component'
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'login'
  },  
  {
    path: 'home',
    component: HomeComponent, canActivate:[AuthGuard]
  },  
  {
    path: 'login',
    component: LoginComponent
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
