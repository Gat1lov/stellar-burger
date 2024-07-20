import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlices } from './slices/user/userSlice';
import { ordersSlices, orderSlices } from './slices/order/orderSlice';
import { builderSlices } from './slices/builder/builderSlice';
import { ingredientsSlices } from './slices/ingredients/ingredientsSlice';
import { feedSlices } from './slices/feed/feedSlice';

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  user: userSlices,
  order: orderSlices,
  orders: ordersSlices,
  builder: builderSlices,
  ingredients: ingredientsSlices,
  feed: feedSlices
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
