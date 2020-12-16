import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as cartSelector from 'src/app/core/cart/cart-selector';
import { CartState } from 'src/app/core/cart/cart-state';
import { takeWhile } from 'rxjs/operators';
import { CartItem } from 'src/app/core/cart/cart-item';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  totalPrice: any;
  total: any;
  ShippingPrice = 20;
  constructor(private store: Store<CartState>) {}

  componentActive = true;
  public cart: CartItem[] = [];
  ngOnInit(): void {
    this.store
      .pipe(
        select(cartSelector.getCartItems),
        takeWhile(() => this.componentActive)
      )
      .subscribe((data) => (this.cart = data));

    this.store.select(cartSelector.getCartItems).subscribe((cart) => {
      this.totalPrice = cart.reduce((count, curItem) => {
        return count + curItem.quantity * curItem.price;
      }, 0);
      this.total = this.totalPrice + this.ShippingPrice;
    });
  }
  placeOrder(value) {}
}
