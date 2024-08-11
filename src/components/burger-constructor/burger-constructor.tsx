import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import {
  orderActions,
  ordBurger,
  orderSelectors
} from '../../services/slices/order/orderSlice';
import {
  builderSelectors,
  resetBuild
} from '../../services/slices/builder/builderSlice';
import { userSelector } from '../../services/slices/user/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector.userData);
  const orderModalData = useSelector(orderSelectors.dataState);
  const orderRequest = useSelector(orderSelectors.loadState);
  const constructorItems = useSelector(builderSelectors.getBuild);
  const ingredientIds = constructorItems.ingredients.map(
    (item: TIngredient) => item._id
  );

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    dispatch(ordBurger([constructorItems.bun?._id, ...ingredientIds])).then(
      () => {
        dispatch(resetBuild());
      }
    );
  };

  const closeOrderModal = () => {
    dispatch(orderActions.resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
