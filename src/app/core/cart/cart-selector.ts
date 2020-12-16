import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart-state';

export const cartFeature = createFeatureSelector<CartState>('carts');

export const cartState = createSelector(cartFeature, (state) => {
  return state;
});

export const getCartItems = createSelector(cartFeature, (state) => {
  return state.cartItems;
});

export const getItemById = (productId) =>
  createSelector(cartFeature, (state) => {
    if (state) {
      return state.cartItems.find((cartItem) => {
        return cartItem.productId === productId;
      });
    }
  });

export const filterById = (productId) =>
  createSelector(cartFeature, (state) => {
    return state.cartItems.filter(
      (cartItems) => cartItems.productId === productId
    );
  });
