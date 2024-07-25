import '../../index.css';
import styles from './app.module.css';

import {
  ConstructorPage,
  Feed,
  Register,
  Login,
  Profile,
  ProfileOrders,
  ResetPassword,
  ForgotPassword,
  NotFound404
} from '@pages';

import { useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { AppHeader } from '../app-header';
import { getCookie } from '../../utils/cookie';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getIngredients } from '../../services/slices/ingredients/ingredientsSlice';
import {
  validUser,
  updUserTkn,
  userAction
} from '../../services/slices/user/userSlice';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';

//Базовая база
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgrountLocate = location.state?.background;
  const accessTkn = getCookie('accessToken');
  const refreshTkn = localStorage.getItem('refreshToken');
  const closeModal = () => navigate(-1);

  //Проверяем токен и обновляем
  useEffect(() => {
    if (!accessTkn && refreshTkn) {
      dispatch(updUserTkn());
    }
  }, [dispatch, accessTkn, refreshTkn]);

  //Валидация авторизации и самого пользователя
  useEffect(() => {
    dispatch(validUser()).finally(() => dispatch(userAction.authValidate()));
  }, [dispatch]);

  //Загружаем ингредиенты
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  //Наводим марафет
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgrountLocate || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute loginVerified>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/registration'
          element={
            <ProtectedRoute loginVerified>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute loginVerified>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute loginVerified>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      {backgrountLocate && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Информация о заказе'} onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={'Информация о заказе'} onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
