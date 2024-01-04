import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Order from "../../models";

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    updateOrderInState(state, action: PayloadAction<Order>) {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
  },
});

export const { setOrders, updateOrderInState } = orderSlice.actions;
export default orderSlice.reducer;
