import { FC, useMemo, useEffect } from 'react';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { Preloader } from '../ui/preloader';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { ingredientsSelectors } from '../../services/slices/ingredients/ingredientsSlice';
import { ordersSelectors } from '../../services/slices/order/orderSlice';
import { fetchOrderDetails, orderSelectors } from '../../services/slices/order/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>(); // Указываем, что number - строка
  const ingredients: TIngredient[] = useSelector(ingredientsSelectors.ingredientsState);
  const orderFromHistory = useSelector(ordersSelectors.ordersState).find(
    (x) => x.number.toString() === number
  );
  const orderFromDetails = useSelector(orderSelectors.dataState);
  const loading = useSelector(orderSelectors.loadState);

  useEffect(() => {
    if (!orderFromHistory && number) {
      // Преобразуем number в число и делаем запрос на сервер
      dispatch(fetchOrderDetails(Number(number)));
    }
  }, [dispatch, orderFromHistory, number]);

  const orderData = orderFromHistory || orderFromDetails;

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

  if (loading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};