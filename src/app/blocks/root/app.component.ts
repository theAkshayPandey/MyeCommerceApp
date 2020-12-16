import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/User';
import { Subscription } from 'rxjs';
import { CartState } from 'src/app/core/cart/cart-state';
import { Store, select } from '@ngrx/store';
import * as cartSelector from 'src/app/core/cart/cart-selector';

import { takeWhile } from 'rxjs/operators';
import { CartService } from 'src/app/core/cart/cart.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shopping-kart';

  user: User;
  userSubscription: Subscription;
  state;
  cart = [];
  componentActive = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private store: Store<CartState>
  ) {
    this.authService.findMe().subscribe((user) => {
      this.user = user;
    });

    this.userSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.store
      .pipe(
        select(cartSelector.getCartItems),
        takeWhile(() => this.componentActive)
      )
      .subscribe((data) => (this.cart = data));

    let p = this.cartService.getCartState();
    console.log(p);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.componentActive = false;
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
