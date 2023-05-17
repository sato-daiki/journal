import React, { useCallback, useMemo, useState } from 'react';
import { TabView } from 'react-native-tab-view';
import { Diary } from '@/types';

import I18n from '@/utils/I18n';
import { ParentTabBar } from '@/components/molecules';
import AiCheck from '@/components/organisms/AiCheck';
import { Key } from '@/screens/MyDiaryTab/MyDiaryScreen';

interface Props {
  isView: boolean;
  diary: Diary;
  editDiary: (objectID: string, diary: Diary) => void;
  successSapling?: boolean;
  activeSapling?: boolean;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressRevise?: () => void;
  onPressAdReward?: (key: Key) => void;
}

const MyDiary: React.FC<Props> = ({
  isView,
  diary,
  editDiary,
  successSapling,
  activeSapling,
  checkPermissions,
  goToRecord,
  onPressRevise,
  onPressAdReward,
}) => {
  const [index, setIndex] = useState(
    diary && (diary.reviseTitle || diary.reviseText) ? 0 : 1,
  );
  const [routes] = useState([
    { key: 'revised', title: I18n.t('myDiary.revised') },
    { key: 'origin', title: I18n.t('myDiary.origin') },
  ]);

  const onIndexChange = useCallback((i: number) => {
    setIndex(i);
  }, []);

  const hasRevised = useMemo(
    () => !!diary.reviseTitle || !!diary.reviseText,
    [diary.reviseText, diary.reviseTitle],
  );

  const renderScene = useCallback(
    ({ route }) => {
      if (!diary) return null;
      switch (route.key) {
        case 'revised':
          return (
            <AiCheck
              hideFooterButton={false}
              diary={diary}
              title={diary.reviseTitle || diary.title}
              text={diary.reviseText || diary.text}
              languageTool={diary.reviseLanguageTool}
              sapling={diary.reviseSapling}
              editDiary={editDiary}
              successSapling={successSapling}
              activeSapling={activeSapling}
              checkPermissions={checkPermissions}
              goToRecord={goToRecord}
              onPressRevise={onPressRevise}
              onPressAdReward={() =>
                onPressAdReward && onPressAdReward('revised')
              }
            />
          );
        case 'origin':
          return (
            <AiCheck
              hideFooterButton={isView || hasRevised}
              diary={diary}
              title={diary.title}
              text={diary.text}
              languageTool={diary.languageTool}
              sapling={diary.sapling}
              editDiary={editDiary}
              successSapling={successSapling}
              activeSapling={activeSapling}
              checkPermissions={checkPermissions}
              goToRecord={goToRecord}
              onPressRevise={onPressRevise}
              onPressAdReward={() =>
                onPressAdReward && onPressAdReward('origin')
              }
            />
          );
        default:
          return null;
      }
    },
    [
      activeSapling,
      checkPermissions,
      diary,
      editDiary,
      goToRecord,
      hasRevised,
      isView,
      onPressAdReward,
      onPressRevise,
      successSapling,
    ],
  );

  const renderTabBar = useCallback(
    (props) => {
      if (hasRevised) {
        return <ParentTabBar {...props} />;
      }
    },
    [hasRevised],
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
    />
  );
};
export default MyDiary;
