import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Favourite } from './favourite/favourite';
import { Crytocurrency } from './crytocurrency/crytocurrency';
import { Wallet } from './wallet/wallet';
import { Dashboard } from './dashboard/dashboard';
import { Register } from './register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {path:'',redirectTo:'',pathMatch:'full'},
  {path:'dashboard',component:Dashboard,canActivate:[authGuard]},
  {path:'register',component:Register},
  {path:'favourite',component:Favourite,canActivate:[authGuard]},
  {path:'cryptocurrency',component:Crytocurrency,canActivate:[authGuard]},
  {path:'wallet',component:Wallet,canActivate:[authGuard]}
];
