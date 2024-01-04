import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootReducer } from "../store";
import Order from "../models";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  role: string;
};

type UpdateStatusRequest = {
  orderId: string;
  status: string;
};

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3333",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootReducer).auth.access_token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "sessions",
        method: "POST",
        body: credentials,
      }),
    }),
    getOrders: builder.query<Order[], void>({
      query: () => "orders",
      transformResponse: (response: { orders: Order[] }) => response.orders,
    }),
    updateOrderStatus: builder.mutation<void, UpdateStatusRequest>({
      query: ({ orderId, status }) => ({
        url: `orders/${orderId}/status`,
        method: "PUT",
        body: { status: status },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} = api;

export default api;
