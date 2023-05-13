import React, { useCallback, useState } from 'react';
import { TabView } from 'react-native-tab-view';
import { Diary } from '@/types';

import I18n from '@/utils/I18n';
import { ParentTabBar } from '@/components/molecules';
import AiCheck from '@/components/organisms/AiCheck';

interface Props {
  diary: Diary;
  editDiary: (objectID: string, diary: Diary) => void;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressRevise?: () => void;
}

const MyDiary: React.FC<Props> = ({
  diary,
  editDiary,
  checkPermissions,
  goToRecord,
  onPressRevise,
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
              checkPermissions={checkPermissions}
              goToRecord={goToRecord}
              onPressRevise={onPressRevise}
            />
          );
        case 'origin':
          return (
            <AiCheck
              hideFooterButton={!!diary.reviseTitle || !!diary.reviseText}
              diary={diary}
              title={diary.title}
              text={diary.text}
              languageTool={diary.languageTool}
              sapling={diary.sapling}
              editDiary={editDiary}
              checkPermissions={checkPermissions}
              goToRecord={goToRecord}
              onPressRevise={onPressRevise}
            />
          );
        default:
          return null;
      }
    },
    [checkPermissions, diary, editDiary, goToRecord, onPressRevise],
  );

  const renderTabBar = useCallback(
    (props) => {
      if (diary && (diary.reviseTitle || diary.reviseText)) {
        return <ParentTabBar {...props} />;
      }
    },
    [diary],
  );

  if (!diary) {
    return null;
  }

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
