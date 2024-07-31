import styles from './constructor-page.module.css';

import { Preloader } from '@ui';
import { FC } from 'react';

import { BurgerIngredients, BurgerConstructor } from '../../components';
import { ingredientsSelectors } from '../../services/slices/ingredients/ingredientsSlice';
import { useSelector } from '../../services/store';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(
    ingredientsSelectors.ingredientsLoad
  );

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
