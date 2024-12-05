import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";


const Store = configureStore({
  reducer: {
    allProducts: productsSlice,
  },
});

export default Store;
