import { configureStore } from '@reduxjs/toolkit';
import {
  regUser,
  loginUser,
  logoutUser,
  validUser,
  refUser,
  updUserTkn,
  userSlices
} from '../slices/user/userSlice';

describe('Проверка асинхронных запросов userSlice', () => {
  const mockRegisterUser = {
    email: 'test@test.ru',
    password: 'test',
    name: 'test'
  };

  const mockLoginUser = { email: 'test@test.ru', password: 'test' };

  const mockUserUpdate = {
    email: 'updated@test.ru',
    password: 'updated',
    name: 'updated'
  };

  // Проверка регистрации пользователя
  describe('regUser', () => {
    test('Проверка запроса pending', () => {
      const store = configureStore({ reducer: { user: userSlices } });

      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

      store.dispatch(regUser(mockRegisterUser));
      const state = store.getState().user;
      expect(state.loading).toBe(true);
    });

    test('Проверка запроса fulfilled', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              accessToken: 'mockAccessToken',
              refreshToken: 'mockRefreshToken',
              user: mockRegisterUser
            })
        })
      ) as jest.Mock;

      await store.dispatch(regUser(mockRegisterUser));
      const state = store.getState().user;
      console.log('regUser fulfilled:', state.data);
      expect(state.data).toEqual(mockRegisterUser);
      expect(state.auth).toBe(true);
      expect(state.loading).toBe(false);
    });

    test('Проверка запроса reject', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      const errorMessage = 'Ошибка запроса';

      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      await store.dispatch(regUser(mockRegisterUser));
      const state = store.getState().user;
      expect(state.data).toBeNull();
      expect(state.auth).toBe(false);
      expect(state.loading).toBe(false);
    });
  });

  // Проверка входа пользователя
  describe('loginUser', () => {
    test('Проверка запроса pending', () => {
      const store = configureStore({ reducer: { user: userSlices } });

      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

      store.dispatch(loginUser(mockLoginUser));
      const state = store.getState().user;
      expect(state.loading).toBe(true);
    });

    test('Проверка запроса fulfilled', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              accessToken: 'mockAccessToken',
              refreshToken: 'mockRefreshToken',
              user: mockLoginUser
            })
        })
      ) as jest.Mock;

      await store.dispatch(loginUser(mockLoginUser));
      const state = store.getState().user;
      console.log('loginUser fulfilled:', state.data);
      expect(state.data).toEqual(mockLoginUser);
      expect(state.auth).toBe(true);
      expect(state.loading).toBe(false);
    });

    test('Проверка запроса reject', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      const errorMessage = 'Ошибка запроса';

      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      await store.dispatch(loginUser(mockLoginUser));
      const state = store.getState().user;
      expect(state.data).toBeNull();
      expect(state.auth).toBe(false);
      expect(state.loading).toBe(false);
    });
  });

  // Проверка выхода пользователя
  describe('logoutUser', () => {
    test('Проверка запроса fulfilled', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        })
      ) as jest.Mock;

      await store.dispatch(logoutUser());
      const state = store.getState().user;
      expect(state.data).toBeNull();
      expect(state.auth).toBe(false);
      expect(state.loading).toBe(false);
    });

    test('Проверка запроса reject', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      const errorMessage = 'Ошибка запроса';

      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      await store.dispatch(logoutUser());
      const state = store.getState().user;
      expect(state.loading).toBe(false);
    });
  });

  // Проверка проверки текущего пользователя
  describe('validUser', () => {
    test('Проверка запроса pending', () => {
      const store = configureStore({ reducer: { user: userSlices } });

      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

      store.dispatch(validUser());
      const state = store.getState().user;
      expect(state.loading).toBe(true);
    });

    test('Проверка запроса fulfilled', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              user: mockLoginUser
            })
        })
      ) as jest.Mock;

      await store.dispatch(validUser());
      const state = store.getState().user;
      expect(state.data).toEqual(mockLoginUser);
      expect(state.auth).toBe(true);
      expect(state.loading).toBe(false);
    });

    test('Проверка запроса reject', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      const errorMessage = 'Ошибка запроса';

      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      await store.dispatch(validUser());
      const state = store.getState().user;
      expect(state.data).toBeNull();
      expect(state.auth).toBe(false);
      expect(state.loading).toBe(false);
    });
  });

  // Проверка обновления пользователя
  describe('refUser', () => {
    test('Проверка запроса pending', () => {
      const store = configureStore({ reducer: { user: userSlices } });

      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

      store.dispatch(refUser(mockUserUpdate));
      const state = store.getState().user;
      expect(state.loading).toBe(true);
    });

    test('Проверка запроса fulfilled', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              user: mockUserUpdate
            })
        })
      ) as jest.Mock;

      await store.dispatch(refUser(mockUserUpdate));
      const state = store.getState().user;
      expect(state.data).toEqual(mockUserUpdate);
      expect(state.loading).toBe(false);
    });

    test('Проверка запроса reject', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      const errorMessage = 'Ошибка запроса';

      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      await store.dispatch(refUser(mockUserUpdate));
      const state = store.getState().user;
      expect(state.loading).toBe(false);
    });
  });

  // Проверка обновления токена пользователя
  describe('updUserTkn', () => {
    test('Проверка запроса pending', () => {
      const store = configureStore({ reducer: { user: userSlices } });

      global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

      store.dispatch(updUserTkn());
      const state = store.getState().user;
      expect(state.loading).toBe(true);
    });

    test('Проверка запроса fulfilled', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        })
      ) as jest.Mock;

      await store.dispatch(updUserTkn());
      const state = store.getState().user;
      expect(state.loading).toBe(false);
    });

    test('Проверка запроса reject', async () => {
      const store = configureStore({ reducer: { user: userSlices } });

      const errorMessage = 'Ошибка запроса';

      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;

      await store.dispatch(updUserTkn());
      const state = store.getState().user;
      expect(state.loading).toBe(false);
    });
  });
});
