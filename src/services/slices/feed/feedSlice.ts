import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//Интерфейс для состояния ленты заказов
export interface IFeedState {
  orders: TOrder[];
  total: number;
  today: number;
  loading: boolean;
}

//Определение начального состояния
export const initialState: IFeedState = {
  orders: [],
  total: 0,
  today: 0,
  loading: false
};

export const getFeed = createAsyncThunk(`feed/get`, getFeedsApi);

//Слайс для ленты заказов
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    orderState: (state: IFeedState) => state.orders,
    totalState: (state: IFeedState) => state.total,
    todatState: (state: IFeedState) => state.today,
    loadState: (state: IFeedState) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders || [];
        state.total = action.payload.total || 0;
        state.today = action.payload.totalToday || 0;
        state.loading = false;
      })
      .addCase(getFeed.rejected, (state) => {
        state.loading = false;
      });
  },
  reducers: {}
});

//Экспорт селекторов и действий
export const feedSelector = feedSlice.selectors;
export const feedAction = feedSlice.actions;
export const feedSlices = feedSlice.reducer;
