import { configureStore } from '@reduxjs/toolkit';
import { getFeed, feedSlice } from '../slices/feed/feedSlice';

describe('Проверка feeds', () => {
  const mock = {
    orders: [
      { id: 1, data: 'first' },
      { id: 2, data: 'second' }
    ],
    total: 2,
    totalToday: 1
  };

  test('pending', () => {
    const store = configureStore({
      reducer: { feed: feedSlice.reducer }
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    store.dispatch(getFeed());
    const state = store.getState().feed;

    expect(state.loading).toBe(true);
    expect(state.orders).toEqual([]);
  });

  test('fulfilled', async () => {
    const store = configureStore({
      reducer: { feed: feedSlice.reducer }
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            orders: mock.orders,
            total: mock.total,
            today: mock.totalToday
          })
      })
    ) as jest.Mock;

    await store.dispatch(getFeed());
    const state = store.getState().feed;
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mock.orders);
  });

  test('rejected', async () => {
    const store = configureStore({
      reducer: { feed: feedSlice.reducer }
    });

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    ) as jest.Mock;

    await store.dispatch(getFeed());
    const state = store.getState().feed;

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([]);
  });
});
