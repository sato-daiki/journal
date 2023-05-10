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
  onPressFairCopy?: () => void;
}

const MyDiary: React.FC<Props> = ({
  diary,
  editDiary,
  checkPermissions,
  goToRecord,
  onPressFairCopy,
}) => {
  const [index, setIndex] = useState(
    diary && (diary.fairCopyTitle || diary.fairCopyText) ? 0 : 1,
  );
  const [routes] = useState([
    { key: 'fairCopy', title: I18n.t('myDiary.fairCopy') },
    { key: 'origin', title: I18n.t('myDiary.origin') },
  ]);

  const onIndexChange = useCallback((i: number) => {
    setIndex(i);
  }, []);

  const renderScene = useCallback(
    ({ route }) => {
      if (!diary) return null;
      switch (route.key) {
        case 'fairCopy':
          return (
            <AiCheck
              hideFooterButton={false}
              diary={diary}
              title={diary.fairCopyTitle || diary.title}
              text={diary.fairCopyText || diary.text}
              titleMatches={diary.fairCopyLanguageTool?.titleMatches}
              textMatches={diary.fairCopyLanguageTool?.textMatches}
              titleEdits={diary.fairCopySapling?.titleEdits}
              textEdits={diary.fairCopySapling?.textEdits}
              editDiary={editDiary}
              checkPermissions={checkPermissions}
              goToRecord={goToRecord}
              onPressFairCopy={onPressFairCopy}
            />
          );
        case 'origin':
          return (
            <AiCheck
              hideFooterButton={!!diary.fairCopyTitle || !!diary.fairCopyText}
              diary={diary}
              title={diary.title}
              text={diary.text}
              titleMatches={diary.languageTool?.titleMatches}
              textMatches={diary.languageTool?.textMatches}
              titleEdits={diary.sapling?.titleEdits}
              textEdits={diary.sapling?.textEdits}
              editDiary={editDiary}
              checkPermissions={checkPermissions}
              goToRecord={goToRecord}
              onPressFairCopy={onPressFairCopy}
            />
          );
        default:
          return null;
      }
    },
    [checkPermissions, diary, editDiary, goToRecord, onPressFairCopy],
  );

  const renderTabBar = useCallback(
    (props) => {
      if (diary && (diary.fairCopyTitle || diary.fairCopyText)) {
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
