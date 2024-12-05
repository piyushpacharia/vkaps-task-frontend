import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; 
import { BASE_URL } from "../../Server";

const initialState = {
  products: [],
  message: "",
  loading: false,
  error: null,
};
  
export const fetchAllProducts = createAsyncThunk("products/getAll", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/fetch-all-products`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.message = "success";
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
