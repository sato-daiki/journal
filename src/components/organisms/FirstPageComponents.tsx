import React from 'react';
import { User } from '@/types';
import NotficationSetting from './NotficationSetting';

interface Props {
  user: User;
  setUser: (user: User) => void;
}

/**
 * 初期ページにおくComponents
 */
const FirstPageComponents = ({ user, setUser }: Props) => {
  return (
    <>
      <NotficationSetting user={user} setUser={setUser} />
    </>
  );
};

export default React.memo(FirstPageComponents);
