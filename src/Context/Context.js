import React from "react";
import { createContext } from "react";
import { faker } from "@faker-js/faker";
import { useReducer } from "react";
import { cartReducers, productReducer } from "./Reducers";
import { useContext } from "react";
const Cart = createContext();
faker.seed(99);
const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    fastDelivery: faker.datatype.boolean(),
  }));
  //   console.log(products);
  const [state, dispatch] = useReducer(cartReducers, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuary: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;
export const CartState = () => {
  return useContext(Cart);
};
