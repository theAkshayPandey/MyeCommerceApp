import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CartState } from 'src/app/core/cart/cart-state';
import * as cartActions from 'src/app/core/cart/cart.actions';
import * as cartSelector from 'src/app/core/cart/cart-selector';
import { CartItem } from 'src/app/core/cart/cart-item';
import { takeWhile } from 'rxjs/operators';
import { ProductDataService } from 'src/app/core/products/product-data.service';
import { Product } from 'src/app/core/products/product';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css'],
})
export class AddtocartComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  carts: CartItem[] = [];
  Subscriptions = [];
  componentActive = true;

  constructor(
    private productDataService: ProductDataService,
    private store: Store<CartState>
  ) {
    this.Subscriptions.push(
      this.productDataService
        .getProducts()
        .subscribe((products) => (this.products = products))
    );

    this.store
      .pipe(
        select(cartSelector.getCartItems),
        takeWhile(() => this.componentActive)
      )
      .subscribe((data) => (this.carts = data));
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.Subscriptions.forEach((s) => s.unsubscribe());
    this.componentActive = false;
  }
  addToCart(value) {
    this.store.dispatch(new cartActions.AddToCart(value));
  }
}
