import { ActionReducer, MetaReducer } from '@ngrx/store';
import { CartService } from './cart.service';
import { CartState } from './cart-state';
import { localStorageSync } from 'ngrx-store-localstorage';

// console.log all actions

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

// Sending state to service

export function metaReducerFactory(
  cartServe: CartService
): MetaReducer<CartState> {
  return (reducer: ActionReducer<any>) => (state, action) => {
    const result = reducer(state, action);
    cartServe.postCartState(result);
    return result;
  };
}
export function getMetaReducers(cartServe: CartService): MetaReducer<any>[] {
  return [metaReducerFactory(cartServe)];
}

//localstorage of state

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['carts'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<any>[] = [
  logger,
  localStorageSyncReducer,
];
