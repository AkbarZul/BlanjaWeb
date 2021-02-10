import * as actions from "./actionTypes";

export const addToCart = (data) => {
  return {
    type: actions.ADD_TO_CART,
    payload: data,
  };
};

export const addToCheckout = (data) => {
  return {
    type: actions.ADD_TO_CHECKOUT,
    payload: data.sendData,
  };
};

export const increaseQuantity = (id) => {
  return {
    type: actions.QUANTITY_INCREASED,
    payload: {
      id: id,
    },
  };
};

export const decreaseQuantity = (id) => {
  return {
    type: actions.QUANTITY_DECREASED,
    payload: {
      id: id,
    },
  };
};

export const clearCart = () => {
  return {
    type: actions.CLEAR_CART,
  };
};

export const clearCheckout = () => {
  return {
    type: actions.CLEAR_CHECKOUT,
  };
};
