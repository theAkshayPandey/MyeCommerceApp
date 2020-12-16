import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductDataService } from '../../core/products/product-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../core/products/product';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Store, select } from '@ngrx/store';
import { CartState } from 'src/app/core/cart/cart-state';
import * as cartActions from 'src/app/core/cart/cart.actions';
import * as cartSelector from 'src/app/core/cart/cart-selector';
import { CartItem } from 'src/app/core/cart/cart-item';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Product>();
  loading = true;
  Subscriptions = [];
  displayedColumns = ['image', 'name', 'price', 'action'];

  product: Product[] = [];
  public cart: CartItem[] = [];
  selection = new SelectionModel<Product>(true, []);
  componentActive = true;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productDataService: ProductDataService,
    private store: Store<CartState>
  ) {
    this.store
      .pipe(
        select(cartSelector.getCartItems),
        takeWhile(() => this.componentActive)
      )
      .subscribe((data) => (this.cart = data));
  }

  ngOnInit() {
    this.Subscriptions.push(
      this.productDataService
        .getProducts()
        .subscribe((products) => this.onDataLoad(products))
    );
  }

  ngOnDestroy() {
    this.Subscriptions.forEach((s) => s.unsubscribe());
    this.componentActive = false;
  }

  onDataLoad(product) {
    this.loading = false;
    this.dataSource.sort = this.sort;
    this.dataSource.data = product;
  }

  addToCart(value) {
    this.store.dispatch(new cartActions.AddToCart(value));
  }
}
