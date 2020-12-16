import { initialState, CartState } from './cart-state';
import { ActionsUnion, ActionTypes } from './cart.actions';
import { CartItem } from './cart-item';

function retrive() {
  return localStorage.getItem('stateKey');
}

export function CartReducer(state = initialState, action: ActionsUnion) {
  let updatedCart;
  let updatedItemIndex;

  switch (action.type) {
    case ActionTypes.Add: {
      const newState = {
        ...state,
        cartItems: [].concat(state.cartItems, action.payload),
      };
      return newState;
    }

    case ActionTypes.Clear: {
      const newState = {
        ...state,
        cartItems: [],
      };
      return newState;
    }
    case ActionTypes.Remove: {
      const newState = {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.productId !== action.payload.productId
        ),
      };
      return newState;
    }

    case ActionTypes.Restore: {
      const newState = {
        ...state,
        state: action.payload,
      };
      return newState;
    }

    case ActionTypes.Update: {
      const newState = {
        ...state,
        cartItems: state.cartItems.map((cartItem: CartItem) =>
          cartItem.productId === action.payload.productId
            ? (cartItem.quantity = action.payload.quantity)
            : cartItem
        ),
      };
      return newState;
    }

    case ActionTypes.IncrementItemQuantity: {
      updatedCart = [...state.cartItems];
      updatedItemIndex = updatedCart.findIndex(
        (cartItem) => cartItem.productId === action.payload.productId
      );

      if (updatedCart[updatedItemIndex].quantity > 9) {
        return state;
      }

      const incrementedItem = {
        ...updatedCart[updatedItemIndex],
      };

      incrementedItem.quantity++;
      incrementedItem.itemTotal =
        incrementedItem.price * incrementedItem.quantity;
      updatedCart[updatedItemIndex] = incrementedItem;

      const newState = { ...state, cartItems: updatedCart };
      return newState;
    }

    case ActionTypes.DecrementItemQuantity: {
      updatedCart = [...state.cartItems];
      updatedItemIndex = updatedCart.findIndex(
        (cartItem) => cartItem.productId === action.payload.productId
      );

      if (updatedCart[updatedItemIndex].quantity < 2) {
        return state;
      }

      const decrementedItem = {
        ...updatedCart[updatedItemIndex],
      };

      decrementedItem.quantity--;
      decrementedItem.itemTotal =
        decrementedItem.price * decrementedItem.quantity;
      updatedCart[updatedItemIndex] = decrementedItem;

      const newState = { ...state, cartItems: updatedCart };
      return newState;
    }

    default:
      return state;
  }
}

export const reducers = { carts: CartReducer };
