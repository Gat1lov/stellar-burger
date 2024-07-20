import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//Интерфейс для состояния заказа
export interface TOrderState {
  data: TOrder | null;
  loading: boolean;
}

//Определение начального состояния
const orderInitialState: TOrderState = {
  data: null,
  loading: false
};

//Интерфейс для состояния списка заказов
export interface IOrdersState {
  orders: TOrder[];
  loading: boolean;
}

//Определение начального состояния
const ordersInitialState: IOrdersState = {
  orders: [],
  loading: false
};

export const ordBurger = createAsyncThunk(
  `order/burger`,
  async (orderData: string[]) => await orderBurgerApi(orderData)
);

export const ordList = createAsyncThunk(`orders/list`, getOrdersApi);

//Слайс для заказа
const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  selectors: {
    dataState: (state: TOrderState) => state.data,
    loadState: (state: TOrderState) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(ordBurger.pending, (state) => {
        state.loading = true;
      })
      .addCase(ordBurger.rejected, (state) => {
        state.loading = false;
      })
      .addCase(ordBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.order;
      });
  },
  reducers: {
    resetOrder: (state) => orderInitialState
  }
});

//Слайс для списка заказов
const ordersSlice = createSlice({
  name: 'orders',
  initialState: ordersInitialState,
  selectors: {
    ordersState: (state: IOrdersState) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(ordList.pending, (state) => {
        state.loading = true;
      })
      .addCase(ordList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(ordList.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  },
  reducers: {}
});

//Экспорт селекторов и действий
export const orderSelectors = orderSlice.selectors;
export const orderActions = orderSlice.actions;
export const ordersSelectors = ordersSlice.selectors;
export const ordersActions = ordersSlice.actions;
export const orderSlices = orderSlice.reducer;
export const ordersSlices = ordersSlice.reducer;
