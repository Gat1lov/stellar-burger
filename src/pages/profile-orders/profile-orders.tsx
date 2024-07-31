import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  ordList,
  ordersSelectors
} from '../../services/slices/order/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ordList());
  }, [dispatch]);
  const orders: TOrder[] = useSelector(ordersSelectors.ordersState);

  return <ProfileOrdersUI orders={orders} />;
};
