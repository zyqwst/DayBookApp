import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {AddBillPage} from '../pages/add-bill/add-bill';
import {SaveBillPage} from '../pages/save-bill/save-bill';
const routes = [
     { path: '', redirectTo: '/add-bill', pathMatch: 'full' },
     { path:'add-bill',component:AddBillPage},
     { path:'save-bill',component:SaveBillPage}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}