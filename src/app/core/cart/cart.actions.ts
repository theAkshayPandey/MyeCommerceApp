import { Action } from '@ngrx/store';
import { CartItem } from 'src/app/core/cart/cart-item';
import { CartState } from './cart-state';

export enum ActionTypes {
  Add = '[CartItem] Add to cart',
  Remove = '[CartItem] Remove from cart',
  Clear = '[CartItem] Clear cart',
  Update = '[CartItem] Update cart item',
  Restore = '[CartItem] Restored cart',
  IncrementItemQuantity = '[CartItem] Increase item quantity',
  DecrementItemQuantity = '[CartItem] Decrease item quantity',
}

export class AddToCart implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: CartItem) {}
}

export class RemoveFromCart implements Action {
  readonly type = ActionTypes.Remove;

  constructor(public payload: CartItem) {}
}

export class ClearCart implements Action {
  readonly type = ActionTypes.Clear;
}
export class UpdateCart implements Action {
  readonly type = ActionTypes.Update;

  constructor(public payload: CartItem) {}
}
export class RestoreCart implements Action {
  readonly type = ActionTypes.Restore;

  constructor(public payload: CartState) {
    console.log(payload);
  }
}

export class IncrementCartQuantity {
  readonly type = ActionTypes.IncrementItemQuantity;

  constructor(public payload: CartItem) {}
}

export class DecrementCartQuantity {
  readonly type = ActionTypes.DecrementItemQuantity;

  constructor(public payload: CartItem) {}
}

export type ActionsUnion =
  | AddToCart
  | RemoveFromCart
  | ClearCart
  | UpdateCart
  | RestoreCart
  | IncrementCartQuantity
  | DecrementCartQuantity;
