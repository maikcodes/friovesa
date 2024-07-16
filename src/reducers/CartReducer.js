import { errorToast, successToast } from "../lib/Toast";
import lang from "../lang/es";

export const cartInitialState = {
  cityName: "",
  cart: [],
  renderToast: () => {},
};

export const CART_ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  CLEAR_CART: "CLEAR_CART",
  DECREMENT_QUANTITY: "DECREMENT_QUANTITY",
  POPULATE_CART: "POPULATE_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  SET_QUANTITY: "SET_QUANTITY",
};

function populateCart(state, action) {
  const { products, cityName } = action.payload;
  return {
    cityName: cityName,
    cart: products,
    renderToast: () => {},
  };
}

function addToCart(state, action) {
  const { product, cityName, quantity } = action.payload;
  const { cart } = state;

  const id = product?.id;
  const productInCartIndex = cart?.findIndex((item) => item.id === id);

  if (productInCartIndex === -1) {
    return {
      cityName: cityName,
      cart: [...cart, { ...action?.payload?.product, quantity: quantity }],
      renderToast: () =>
        successToast({
          title: product?.name,
          subtitle: lang?.addToCartSuccessfully,
        }),
    };
  }

  const maxQuantity = cart[productInCartIndex].stockQuantity;

  if (
    cart[productInCartIndex].quantity === maxQuantity ||
    cart[productInCartIndex].quantity + quantity > maxQuantity
  ) {
    return {
      cityName: cityName,
      cart: cart,
      renderToast: () =>
        errorToast({
          title: `${
            lang?.youCanOnlyPurchase
          } ${maxQuantity} ${lang?.forThisProduct?.toLowerCase()}`,
        }),
    };
  }

  const newState = [
    ...cart?.slice(0, productInCartIndex),
    {
      ...cart[productInCartIndex],
      quantity: cart[productInCartIndex].quantity + quantity,
    },
    ...cart?.slice(productInCartIndex + 1),
  ];
  return {
    cityName: cityName,
    cart: newState,
    renderToast: () =>
      successToast({
        title: product?.name,
        subtitle: lang?.addToCartSuccessfully,
      }),
  };
}

function clearCart() {
  return {
    cityName: "",
    cart: [],
    renderToast: () => {},
  };
}

function decrementQuantity(state, action) {
  const { productId } = action.payload;
  const { cart, cityName } = state;
  const productInCartIndex = cart?.findIndex((item) => item.id === productId);

  if (productInCartIndex === -1) {
    return {
      cityName: cityName,
      cart: cart,
    };
  }

  if (cart[productInCartIndex].quantity === 1) {
    const newState = cart?.filter((item) => item.id !== productId);
    return {
      cityName: cityName,
      cart: newState,
    };
  }

  const newState = [
    ...cart?.slice(0, productInCartIndex),
    {
      ...cart[productInCartIndex],
      quantity: cart[productInCartIndex].quantity - 1,
    },
    ...cart?.slice(productInCartIndex + 1),
  ];
  return {
    cityName: cityName,
    cart: newState,
  };
}

function removeFromCart(state, action) {
  const { productId } = action.payload;
  const { cart, cityName } = state;
  const productInCartIndex = cart?.findIndex((item) => item.id === productId);

  if (productInCartIndex === -1) {
    return {
      cityName: cityName,
      cart: cart,
    };
  }

  const newState = cart?.filter((item) => item.id !== productId);
  return {
    cityName: cityName,
    cart: newState,
  };
}

function setQuantity(state, action) {
  const { productId, quantity } = action.payload;
  const { cart, cityName } = state;
  const productInCartIndex = cart?.findIndex((item) => item.id === productId);

  if (productInCartIndex === -1) {
    return {
      cityName: cityName,
      cart: cart,
    };
  }

  if (cart[productInCartIndex].quantity === quantity) {
    return {
      cityName: cityName,
      cart: cart,
    };
  }

  const beforeProduct = cart?.slice(0, productInCartIndex);
  const afterProduct = cart?.slice(productInCartIndex + 1);
  const productQuantityAdded = {
    ...cart[productInCartIndex],
    quantity,
  };
  const newState = [...beforeProduct, productQuantityAdded, ...afterProduct];
  return {
    cityName: cityName,
    cart: newState,
  };
}

const UPDATE_STATE = {
  [CART_ACTIONS.ADD_TO_CART]: addToCart,
  [CART_ACTIONS.CLEAR_CART]: clearCart,
  [CART_ACTIONS.DECREMENT_QUANTITY]: decrementQuantity,
  [CART_ACTIONS.POPULATE_CART]: populateCart,
  [CART_ACTIONS.REMOVE_FROM_CART]: removeFromCart,
  [CART_ACTIONS.SET_QUANTITY]: setQuantity,
};

export const cartReducer = (state, action) => {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE[actionType];
  return updateState ? updateState(state, action) : state;
};
