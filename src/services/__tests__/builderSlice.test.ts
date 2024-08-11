import { configureStore } from '@reduxjs/toolkit';
import builderSlices, {
  addIngredient,
  moveIngredient,
  removeIngredient,
  resetBuild,
  IConstructorState
} from '../slices/builder/builderSlice';
import { TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid')
}));

describe('Проверка builderSlice', () => {
  const initialState: IConstructorState = {
    ingredients: [],
    bun: null
  };

  const store = configureStore({
    reducer: { builderSlices }
  });

  beforeEach(() => {
    store.dispatch(resetBuild());
  });

  test('начальное состояние', () => {
    const state = store.getState().builderSlices;
    expect(state).toEqual(initialState);
  });

  test('добавление булки', () => {
    const bun: TIngredient = {
      _id: '1',
      name: 'Bun',
      type: 'bun',
      price: 1,
      image: '',
      image_large: '',
      image_mobile: '',
      calories: 200,
      proteins: 10,
      fat: 5,
      carbohydrates: 30
    };
    store.dispatch(addIngredient(bun));

    const state = store.getState().builderSlices;
    expect(state.bun).toEqual({ ...bun, id: 'test-uuid' });
    expect(state.ingredients).toEqual([]);
  });

  test('добавление ингредиента', () => {
    const ingredient: TIngredient = {
      _id: '2',
      name: 'Meat',
      type: 'main',
      price: 3,
      image: '',
      image_large: '',
      image_mobile: '',
      calories: 500,
      proteins: 50,
      fat: 25,
      carbohydrates: 0
    };
    store.dispatch(addIngredient(ingredient));

    const state = store.getState().builderSlices;
    expect(state.ingredients).toEqual([{ ...ingredient, id: 'test-uuid' }]);
  });

  test('перемещение ингредиента', () => {
    const ingredient1: TIngredient = {
      _id: '2',
      name: 'Meat',
      type: 'main',
      price: 3,
      image: '',
      image_large: '',
      image_mobile: '',
      calories: 500,
      proteins: 50,
      fat: 25,
      carbohydrates: 0
    };
    const ingredient2: TIngredient = {
      _id: '3',
      name: 'Cheese',
      type: 'main',
      price: 2,
      image: '',
      image_large: '',
      image_mobile: '',
      calories: 200,
      proteins: 10,
      fat: 15,
      carbohydrates: 5
    };
    store.dispatch(addIngredient(ingredient1));
    store.dispatch(addIngredient(ingredient2));

    store.dispatch(moveIngredient({ position: 0, newPosition: 1 }));

    const state = store.getState().builderSlices;
    expect(state.ingredients[0].name).toBe('Cheese');
    expect(state.ingredients[1].name).toBe('Meat');
  });

  test('удаление ингредиента', () => {
    const ingredient1: TIngredient = {
      _id: '2',
      name: 'Meat',
      type: 'main',
      price: 3,
      image: '',
      image_large: '',
      image_mobile: '',
      calories: 500,
      proteins: 50,
      fat: 25,
      carbohydrates: 0
    };
    store.dispatch(addIngredient(ingredient1));

    store.dispatch(removeIngredient(0));

    const state = store.getState().builderSlices;
    expect(state.ingredients).toEqual([]);
  });

  test('сброс конструктора', () => {
    const ingredient: TIngredient = {
      _id: '2',
      name: 'Meat',
      type: 'main',
      price: 3,
      image: '',
      image_large: '',
      image_mobile: '',
      calories: 500,
      proteins: 50,
      fat: 25,
      carbohydrates: 0
    };
    store.dispatch(addIngredient(ingredient));

    store.dispatch(resetBuild());

    const state = store.getState().builderSlices;
    expect(state).toEqual(initialState);
  });
});
