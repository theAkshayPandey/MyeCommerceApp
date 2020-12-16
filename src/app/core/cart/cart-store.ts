import { Injectable } from '@angular/core';
import { Store } from '../store';
import { CartState, initialState } from './cart-state';
import { CartItem } from './cart-item';

@Injectable({ providedIn: 'root' })
export class CartStore extends Store<CartState> {
  constructor() {
    super(initialState);
  }

  addCartItem(cartItemToAdd: CartItem) {
    const newState = {
      ...this.State,
      cartItems: [].concat(this.State.cartItems, cartItemToAdd),
    };
    this.setState(newState);
  }

  clearCart() {
    const newState = initialState;
    this.setState(newState);
  }

  restoreCart(stateToRestore: CartState) {
    this.setState(stateToRestore);
  }

  removeCartItem(cartItemToRemove: CartItem) {
    const newState = {
      ...this.State,
      cartItems: this.State.cartItems.filter(
        (cartItem) => cartItem.productId !== cartItemToRemove.productId
      ),
    };
    this.setState(newState);
  }

  updateCartItem(cartItemToUpdate: CartItem) {
    const newState = {
      ...this.State,
      cartItems: this.State.cartItems.map((cartItem) =>
        cartItem.productId === cartItemToUpdate.productId
          ? cartItemToUpdate
          : cartItem
      ),
    };
    this.setState(newState);
  }
}
