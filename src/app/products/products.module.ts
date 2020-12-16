import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductDataService } from '../core/products/product-data.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CartService } from '../core/cart/cart.service';
import { StoreModule } from '@ngrx/store';
import { CartReducer } from '../core/cart/cart.reducers';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature('carts', CartReducer),
  ],
  providers: [ProductDataService, CartService],
})
export class ProductsModule {}
