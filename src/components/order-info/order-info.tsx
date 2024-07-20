import { FC, useMemo } from 'react';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { Preloader } from '../ui/preloader';
import { useParams } from 'react-router-dom';

import { useSelector } from '../../services/store';
import { ingredientsSelectors } from '../../services/slices/ingredients/ingredientsSlice';
import { feedSelector } from '../../services/slices/feed/feedSlice';

export const OrderInfo: FC = () => {
  const feed = useSelector(feedSelector.orderState);
  const { number } = useParams();
  const ingredients: TIngredient[] = useSelector(
    ingredientsSelectors.ingredientsState
  );
  const orderData = feed.find((x) => x.number.toString() === number);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
    const date = new Date(orderData.createdAt);
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );
    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
