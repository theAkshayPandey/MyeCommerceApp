import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { CartService } from '../core/cart/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { CartReducer } from '../core/cart/cart.reducers';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [CartComponent, CartPageComponent, OrdersComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature('carts', CartReducer),
  ],
  providers: [CartService],
})
export class CartModule {}
