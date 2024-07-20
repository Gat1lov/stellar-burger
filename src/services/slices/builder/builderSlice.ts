import { v4 as uuidv4 } from 'uuid';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

//Интерфейс состояния конструктора
export interface IConstructorState {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
}

//Определение начального состояния
export const initialState: IConstructorState = {
  ingredients: [],
  bun: null
};

//Слайс для конструктора
export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  selectors: {
    getBuild: (state) => state
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    moveIngredient: (state, action) => {
      const { position, newPosition } = action.payload;
      [state.ingredients[position], state.ingredients[newPosition]] = [
        state.ingredients[newPosition],
        state.ingredients[position]
      ];
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== action.payload
      );
    },
    resetBuild: (state) => (state = initialState)
  }
});

//Экспорт селекторов и действий
export const builderSelectors = builderSlice.selectors;
export const builderActions = builderSlice.actions;
export const { addIngredient, moveIngredient, removeIngredient, resetBuild } =
  builderSlice.actions;
export const builderSlices = builderSlice.reducer;
