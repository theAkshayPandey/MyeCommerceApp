import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartItem } from 'src/app/core/cart/cart-item';
import * as cartSelector from 'src/app/core/cart/cart-selector';
import { CartState } from 'src/app/core/cart/cart-state';
import { Store, select } from '@ngrx/store';
import * as cartActions from 'src/app/core/cart/cart.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<CartItem>();
  displayedColumns = ['image', 'name', 'qty', 'itemTotal', 'action'];
  Subscriptions = [];
  componentActive = true;
  public cart: CartItem[] = [];
  state: CartState;

  constructor(private store: Store<CartState>) {}

  ngOnInit() {
    this.store
      .pipe(
        select(cartSelector.getCartItems),
        takeWhile(() => this.componentActive)
      )
      .subscribe((data) => (this.cart = data));
    this.dataSource.data = this.cart;
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  remove(value): void {
    this.store.dispatch(new cartActions.RemoveFromCart(value));
    this.ngOnInit();
  }
  increase(value): void {
    this.store.dispatch(new cartActions.IncrementCartQuantity(value));
    this.ngOnInit();
  }
  decrease(value): void {
    this.store.dispatch(new cartActions.DecrementCartQuantity(value));
    this.ngOnInit();
  }

  clear() {
    this.store.dispatch(new cartActions.ClearCart());
  }

  wishlist(value) {}
}
