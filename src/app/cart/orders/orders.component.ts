import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartItem } from 'src/app/core/cart/cart-item';
import { CartState } from 'src/app/core/cart/cart-state';
import { Store, select } from '@ngrx/store';
import * as cartSelector from 'src/app/core/cart/cart-selector';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<CartItem>();
  displayedColumns = ['orderNo', 'date', 'qty', 'item', 'totalPrice'];
  order: CartItem[] = [];
  componentActive: boolean = true;
  constructor(private store: Store<CartState>) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(cartSelector.getCartItems),
        takeWhile(() => this.componentActive)
      )
      .subscribe((data) => (this.order = data));
    this.dataSource.data = this.order;
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
