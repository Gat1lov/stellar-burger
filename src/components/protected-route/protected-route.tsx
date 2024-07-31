import React from 'react';
import { Preloader } from '../ui/preloader';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '../../services/store';
import { userSelector } from '../../services/slices/user/userSlice';

//Определяем тип для пропсов компонента ProtectedRoute
type ProtectedRouteProps = {
  loginVerified?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  loginVerified,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(userSelector.userData);
  const location = useLocation();
  const isAuthorized = useSelector(userSelector.userAuth);

  //Если пользователь не авторизован, откидываем прелоадер
  if (!isAuthorized) {
    return <Preloader />;
  }

  //Если логин не проверен и пользователь не найден, откидываем на страницу логина
  if (!loginVerified && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  //Если логин проверен и пользователь найден, откидываем на предыдущую страницу или на главную
  if (loginVerified && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} state={location} />;
  }

  return children;
};
