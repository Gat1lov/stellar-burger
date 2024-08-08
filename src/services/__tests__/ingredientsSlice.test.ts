import { configureStore } from '@reduxjs/toolkit';
import {
  getIngredients,
  ingredientsSlices
} from '../slices/ingredients/ingredientsSlice';

describe('Проверка ingredients', () => {
  const store = configureStore({
    reducer: { ingredientsSlices }
  });

  const mock = [
    { id: 1, data: 'first' },
    { id: 2, data: 'second' }
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            data: []
          })
      })
    ) as jest.Mock;

    store.dispatch(getIngredients());
  });

  test('pending', () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    store.dispatch(getIngredients());
    const states = store.getState().ingredientsSlices;
    expect(states.ingredients).toEqual([]);
    expect(states.loading).toBe(true);
  });

  test('fulfilled', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            data: mock
          })
      })
    ) as jest.Mock;

    await store.dispatch(getIngredients());
    const states = store.getState().ingredientsSlices;
    expect(states.ingredients).toEqual(mock);
    expect(states.loading).toBe(false);
  });

  test('rejected', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    ) as jest.Mock;

    await store.dispatch(getIngredients());
    const states = store.getState().ingredientsSlices;
    expect(states.ingredients).toEqual([]);
    expect(states.loading).toBe(false);
  });
});
