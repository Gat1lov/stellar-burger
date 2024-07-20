import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { TIngredient } from '@utils-types';

import { useSelector } from '../../services/store';
import { builderSelectors } from '../../services/slices/builder/builderSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const ingredientBuilder = useSelector(builderSelectors.getBuild);

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};
    const { ingredients, bun } = ingredientBuilder;
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [ingredientBuilder]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
