import { configureStore } from '@reduxjs/toolkit';
import { orderSlices, fetchOrderDetails } from '../slices/order/orderSlice';
import { TOrder } from '@utils-types';

describe('Проверка orderSlice', () => {
  const store = configureStore({
    reducer: { orderSlices }
  });

  const mockOrder: TOrder = {
    _id: '1',
    status: 'completed',
    name: 'Burger',
    createdAt: '2023-08-06T12:00:00.000Z',
    updatedAt: '2023-08-06T12:00:00.000Z',
    number: 123,
    ingredients: ['bun', 'meat', 'lettuce']
  };

  beforeEach(() => {
    store.dispatch({ type: 'order/resetOrder' });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            orders: [mockOrder]
          })
      })
    ) as jest.Mock;
  });

  test('pending', () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    store.dispatch(fetchOrderDetails(1));
    const state = store.getState().orderSlices;
    expect(state.data).toBeNull();
    expect(state.loading).toBe(true);
  });

  test('fulfilled', async () => {
    await store.dispatch(fetchOrderDetails(1));
    const state = store.getState().orderSlices;
    expect(state.data).toEqual(mockOrder);
    expect(state.loading).toBe(false);
  });

  test('rejected', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    ) as jest.Mock;

    await store.dispatch(fetchOrderDetails(1));
    const state = store.getState().orderSlices;
    expect(state.data).toBeNull();
    expect(state.loading).toBe(false);
  });
});
