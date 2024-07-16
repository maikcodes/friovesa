import {
  cartInitialState,
  cartReducer,
  CART_ACTIONS,
} from "../reducers/CartReducer";
import { convertToMoney } from "../lib/utils";
import { createContext, useEffect, useRef } from "react";
import { useReducer } from "react";
import { PlainStorage } from "../lib/PlainStorage";

export const CartContext = createContext();

function useCartReducer() {
  const isFirstRender = useRef(true);
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);
  const { cart } = state;

  useEffect(() => {
    const saveCart = async () => {
      await PlainStorage.save(
        "cart",
        JSON.stringify({
          products: state?.cart,
          cityName: state?.cityName,
        })
      );
    };

    const prepareCart = async () => {
      const storedCart = await PlainStorage.getValueByKey("cart");
      const storedCartParsed = JSON.parse(storedCart);
      if (storedCartParsed?.products?.length > 0) {
        dispatch({
          type: CART_ACTIONS.POPULATE_CART,
          payload: storedCartParsed,
        });
      }
    };

    if (isFirstRender.current) {
      prepareCart();
      isFirstRender.current = false;
      return;
    } else {
      saveCart();
    }

    const renderToast = () => {
      try {
        state?.renderToast();
      } catch (error) {
        return;
      }
    };
    
    renderToast();
  }, [state]);

  const addToCart = (product, cityName = "", quantity = 1) =>
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { product, cityName, quantity },
    });

  const clearCart = () =>
    dispatch({
      type: CART_ACTIONS.CLEAR_CART,
    });

  const decrementQuantity = (productId) =>
    dispatch({
      type: CART_ACTIONS.DECREMENT_QUANTITY,
      payload: { productId },
    });

  const removeFromCart = (productId) =>
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { productId },
    });

  const setQuantity = (productId, quantity) =>
    dispatch({
      type: CART_ACTIONS.SET_QUANTITY,
      payload: { productId, quantity },
    });

  const itemsCount = cart
    ?.map((product) => product.quantity)
    .reduce((a, b) => a + b, 0);

  const rawTotal = cart
    ?.map((product) => Number(product.price) * Number(product.quantity))
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
  const total = convertToMoney(rawTotal);

  const cityName = state?.cart?.length === 0 ? "" : state?.cityName;

  const productQuantity = (productId) => {
    const product = cart?.find((product) => product.id === productId);
    return product?.quantity ?? 0;
  };

  return {
    addToCart,
    cityName,
    clearCart,
    decrementQuantity,
    itemsCount,
    productQuantity,
    removeFromCart,
    setQuantity,
    state,
    total,
  };
}

export function CartProvider({ children }) {
  const {
    addToCart,
    cityName,
    clearCart,
    decrementQuantity,
    itemsCount,
    productQuantity,
    removeFromCart,
    setQuantity,
    state,
    total,
  } = useCartReducer();

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart: state?.cart,
        cityName,
        clearCart,
        decrementQuantity,
        itemsCount,
        productQuantity,
        removeFromCart,
        setQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
