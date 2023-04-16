import React, { useCallback, useState } from 'react';
import { getDataCorrectionStatus } from '@/utils/correcting';
import { updateYet } from '@/utils/diary';
import { User } from '@/types';
import ModalStillCorrecting from '@/components/organisms/ModalStillCorrecting';
// import ModalAppSuggestion from '@/components/web/organisms/ModalAppSuggestion';
import NotficationSetting from './NotficationSetting';

interface Props {
  user: User;
  setUser: (user: User) => void;
}

/**
 * 初期ページにおくComponents
 */
const FirstPageComponents = ({ user, setUser }: Props) => {
  const [isStillLoading, setIsStillLoading] = useState(false);
  const [correctingObjectID, setCorrectingObjectID] = useState(
    user.correctingObjectID,
  );

  const onPressModalStill = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isStillLoading || !user.correctingObjectID) return;
      setIsStillLoading(true);
      // ステータスを戻す
      const data = getDataCorrectionStatus(user.correctingCorrectedNum, 'yet');
      if (!data) return;
      updateYet(user.correctingObjectID, user.uid, data);

      setUser({
        ...user,
        correctingObjectID: null,
        correctingCorrectedNum: null,
      });
      setIsStillLoading(false);
      setCorrectingObjectID(null);
    };
    f();
  }, [isStillLoading, setUser, user]);

  return (
    <>
      <ModalStillCorrecting
        visible={!!correctingObjectID}
        isLoading={isStillLoading}
        onPress={onPressModalStill}
      />
      <NotficationSetting user={user} setUser={setUser} />
      {/* <ModalAppSuggestion user={user} setUser={setUser} /> */}
    </>
  );
};

export default React.memo(FirstPageComponents);
