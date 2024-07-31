import { FC } from 'react';
import { AppHeaderUI } from '@ui';

import { useSelector } from '../../services/store';
import { userSelector } from '../../services/slices/user/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(userSelector.userData);
  return <AppHeaderUI userName={user ? user.name : ''} />;
};
