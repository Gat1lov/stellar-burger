import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { ingredientsSelectors } from '../../services/slices/ingredients/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const ingredientID = useParams().id;

  const ingredientData = useSelector(
    ingredientsSelectors.ingredientsState
  ).find((item) => item._id === ingredientID);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
