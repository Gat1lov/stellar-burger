import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//Интерфейс для состояния ингредиентов
export interface IIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
}

//Определение начального состояния
export const initialState: IIngredientsState = {
  ingredients: [],
  loading: false
};

export const getIngredients = createAsyncThunk(
  `ingredients/get`,
  async () => await getIngredientsApi()
);

//Слайс для ингредиентов
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    ingredientsState: (state) => state.ingredients,
    ingredientsLoad: (state) => state.loading
  },
  extraReducers(builder) {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  },
  reducers: {}
});

//Экспорт селекторов и действий
export const ingredientsSelectors = ingredientsSlice.selectors;
export const ingredientsActions = ingredientsSlice.actions;
export const ingredientsSlices = ingredientsSlice.reducer;
