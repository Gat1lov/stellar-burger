import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../../utils/cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  updateUserApi,
  TLoginData,
  loginUserApi,
  TRegisterData,
  registerUserApi,
  refreshToken,
  logoutApi
} from '@api';

export interface IUserState {
  data: TUser | null;
  auth: boolean;
  loading: boolean;
}

export const initialState: IUserState = {
  data: null,
  auth: false,
  loading: false
};

//Регистрация пользователя
export const regUser = createAsyncThunk(
  'user/registration',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

//Вход пользователя
export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

//Выход пользователя
export const logoutUser = createAsyncThunk('user/logout', async () => {
  const data = await logoutApi();
  if (data.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
  return data.success;
});

//Проверка текущего пользователя
export const validUser = createAsyncThunk('user/validate', async () => {
  const data = await getUserApi();
  return data.user;
});

//Обновление информации о пользователе
export const refUser = createAsyncThunk(
  'user/refresh',
  async (userData: TRegisterData) => {
    const data = await updateUserApi(userData);
    return data.user;
  }
);

//Обновление токена пользователя
export const updUserTkn = createAsyncThunk('user/token', async () => {
  const data = await refreshToken();
  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data.accessToken;
});

//Слайс для управления состоянием пользователя
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authValidate: (state) => {
      state.auth = true;
    }
  },
  selectors: {
    userState: (state: IUserState) => state,
    userData: (state: IUserState) => state.data,
    userAuth: (state: IUserState) => state.auth,
    userLoad: (state: IUserState) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(regUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.auth = true;
        state.loading = false;
      })
      .addCase(regUser.rejected, (state) => {
        state.loading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.auth = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = null;
          state.auth = false;
        }
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      })

      .addCase(validUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(validUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.auth = true;
        state.loading = false;
      })
      .addCase(validUser.rejected, (state) => {
        state.data = null;
        state.auth = false;
        state.loading = false;
      })

      .addCase(refUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(refUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(refUser.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updUserTkn.pending, (state) => {
        state.loading = true;
      })
      .addCase(updUserTkn.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updUserTkn.rejected, (state) => {
        state.loading = false;
      });
  }
});

//Экспорт селекторов и действий
export const userSelector = userSlice.selectors;
export const userAction = userSlice.actions;
export const userSlices = userSlice.reducer;
