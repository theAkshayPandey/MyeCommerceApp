import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ShoppingReducer } from './cart/reducers/cart.reducer';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    StoreModule.forRoot({
      shopping:ShoppingReducer
    })
  ],
  
})
export class CoreModule { }
