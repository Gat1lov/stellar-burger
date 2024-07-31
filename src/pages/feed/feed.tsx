import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { feedSelector, getFeed } from '../../services/slices/feed/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(feedSelector.orderState);
  const isLoading = useSelector(feedSelector.loadState);

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
